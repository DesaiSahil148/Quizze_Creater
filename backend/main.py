from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base, SessionLocal
from models import Quiz, Question, Result
from schemas import QuestionCreate, ResultCreate
from websocket_manager import manager
from anti_cheat import check_duplicate_submission, mark_submitted
from timer import start_quiz, get_remaining_time
from mcq_engine import calculate_score

# -------------------------------------------------
# APP INITIALIZATION
# -------------------------------------------------

app = FastAPI()

# ✅ CORS CONFIG (VERY IMPORTANT FOR VERCEL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://quizze-creater.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)

# -------------------------------------------------
# ROOT
# -------------------------------------------------

@app.get("/")
def root():
    return {"message": "Quizze_Creater Backend Running"}

# -------------------------------------------------
# QUIZ CONTROL
# -------------------------------------------------

@app.post("/start-quiz/")
def start_quiz_api(duration: int):
    start_quiz(duration)
    return {"status": "quiz started"}

@app.get("/time-left/")
def time_left():
    return {"remaining": get_remaining_time()}

# -------------------------------------------------
# QUESTIONS
# -------------------------------------------------

@app.post("/add-question/")
def add_question(data: QuestionCreate):
    db = SessionLocal()
    question = Question(**data.dict())
    db.add(question)
    db.commit()
    db.close()
    return {"status": "question added"}

@app.get("/questions/{quiz_id}")
def get_questions(quiz_id: int):
    db = SessionLocal()
    questions = db.query(Question).filter(Question.quiz_id == quiz_id).all()
    db.close()
    return questions

# -------------------------------------------------
# RESULTS
# -------------------------------------------------

@app.post("/submit/")
def submit_result(data: ResultCreate):
    if check_duplicate_submission(data.username):
        return {"error": "Already submitted"}

    db = SessionLocal()
    result = Result(username=data.username, score=data.score)
    db.add(result)
    db.commit()
    db.close()

    mark_submitted(data.username)
    return {"status": "submitted"}

@app.get("/leaderboard/")
def leaderboard():
    db = SessionLocal()
    results = db.query(Result).order_by(Result.score.desc()).all()
    db.close()
    return results

# -------------------------------------------------
# WEBSOCKET
# -------------------------------------------------

@app.websocket("/ws/quiz")
async def quiz_ws(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# -------------------------------------------------
# QUIZ CREATION
# -------------------------------------------------

@app.post("/create-quiz/")
def create_quiz(title: str, duration: int):
    db = SessionLocal()
    quiz = Quiz(title=title, duration=duration, is_active=True)
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    db.close()
    return quiz

# -------------------------------------------------
# MCQ SUBMISSION & SCORING
# -------------------------------------------------

@app.post("/submit-answers/")
def submit_answers(payload: dict):
    quiz_id = payload["quiz_id"]
    answers = payload["answers"]

    db = SessionLocal()
    questions = db.query(Question).filter(Question.quiz_id == quiz_id).all()
    db.close()

    score = calculate_score(questions, answers)
    total = len(questions)
    percentage = int((score / total) * 100) if total else 0

    return {
        "score": score,
        "total": total,
        "percentage": percentage
    }
