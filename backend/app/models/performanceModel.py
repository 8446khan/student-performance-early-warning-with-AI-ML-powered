from app import db


class StudentPerformance(db.Model):

    __tablename__ = "student_performance"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(db.Integer)

    attendance_percent = db.Column(db.Float)

    assignments_submitted = db.Column(db.Integer)

    absent_days = db.Column(db.Integer)

    present_days = db.Column(db.Integer)

    risk_label = db.Column(db.String(50))
