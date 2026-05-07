from app import db
from app.models.performanceModel import StudentPerformance

# 🔢 Insert performance for student IDs 1–10

data = [
    StudentPerformance(
        student_id=1,
        attendance_percent=90,
        assignments_submitted=8,
        absent_days=2,
        present_days=28,
        risk_label="Low",
    ),
    StudentPerformance(
        student_id=2,
        attendance_percent=85,
        assignments_submitted=7,
        absent_days=4,
        present_days=26,
        risk_label="Low",
    ),
    StudentPerformance(
        student_id=3,
        attendance_percent=75,
        assignments_submitted=5,
        absent_days=7,
        present_days=23,
        risk_label="Medium",
    ),
    StudentPerformance(
        student_id=4,
        attendance_percent=70,
        assignments_submitted=4,
        absent_days=9,
        present_days=21,
        risk_label="Medium",
    ),
    StudentPerformance(
        student_id=5,
        attendance_percent=60,
        assignments_submitted=3,
        absent_days=11,
        present_days=19,
        risk_label="High",
    ),
    StudentPerformance(
        student_id=6,
        attendance_percent=55,
        assignments_submitted=2,
        absent_days=13,
        present_days=17,
        risk_label="High",
    ),
    StudentPerformance(
        student_id=7,
        attendance_percent=92,
        assignments_submitted=9,
        absent_days=1,
        present_days=29,
        risk_label="Low",
    ),
    StudentPerformance(
        student_id=8,
        attendance_percent=78,
        assignments_submitted=6,
        absent_days=6,
        present_days=24,
        risk_label="Medium",
    ),
    StudentPerformance(
        student_id=9,
        attendance_percent=65,
        assignments_submitted=4,
        absent_days=10,
        present_days=20,
        risk_label="Medium",
    ),
    StudentPerformance(
        student_id=10,
        attendance_percent=50,
        assignments_submitted=1,
        absent_days=15,
        present_days=15,
        risk_label="High",
    ),
]

for record in data:
    db.session.add(record)

db.session.commit()

print("Performance data inserted successfully ✅")
