from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    role = Column(String)  # student / faculty


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    duration = Column(Integer)  # seconds
    is_active = Column(Boolean, default=False)


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    question = Column(String)
    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)
    correct_option = Column(String)


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    score = Column(Integer)
