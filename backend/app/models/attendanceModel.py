from app import db
from datetime import datetime


class Attendance(db.Model):

    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(db.Integer)

    student_name = db.Column(db.String(100))

    status = db.Column(db.String(20))

    date = db.Column(db.DateTime, default=datetime.utcnow)
