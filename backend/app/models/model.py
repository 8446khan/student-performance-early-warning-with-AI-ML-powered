# 👤 Student Table
from app import db


class classCoordinatoradd(db.Model):

    __tablename__ = "student"

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    rollno = db.Column(db.String(100), nullable=False)
    ienno = db.Column(db.String(100), nullable=False)
    branch = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

    # (Optional - you can keep or remove later)
    parentName = db.Column(db.String(100))
    parentContact = db.Column(db.String(20))
