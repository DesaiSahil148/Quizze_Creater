from pydantic import BaseModel

class QuestionCreate(BaseModel):
    quiz_id: int
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str


class ResultCreate(BaseModel):
    username: str
    score: int
