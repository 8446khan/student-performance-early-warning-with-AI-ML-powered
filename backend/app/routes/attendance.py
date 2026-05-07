from flask import Blueprint, request, jsonify
from app import db
from app.models.attendanceModel import Attendance
from app.models.model import classCoordinatoradd

attendance_bp = Blueprint("attendance", __name__)


# ===============================
# SAVE ATTENDANCE
# ===============================


@attendance_bp.route("/save-attendance", methods=["POST"])
def save_attendance():

    data = request.json

    attendance_data = data.get("attendance")

    for student_id, status in attendance_data.items():

        student = classCoordinatoradd.query.get(int(student_id))

        if student:

            new_record = Attendance(
                student_id=student.id, student_name=student.fullname, status=status
            )

            db.session.add(new_record)

    db.session.commit()

    return jsonify({"message": "Attendance saved successfully"})


# ===============================
# VIEW ATTENDANCE
# ===============================


@attendance_bp.route("/view-attendance", methods=["GET"])
def view_attendance():

    records = Attendance.query.all()

    output = []

    for r in records:

        output.append(
            {
                "id": r.id,
                "student_name": r.student_name,
                "status": r.status,
                "date": r.date.strftime("%Y-%m-%d"),
            }
        )

    return jsonify(output)


# ===============================
# PRESENT STUDENTS
# ===============================


@attendance_bp.route("/present-students", methods=["GET"])
def present_students():

    records = Attendance.query.filter_by(status="Present").all()

    output = []

    for r in records:

        output.append(
            {
                "id": r.id,
                "student_name": r.student_name,
                "date": r.date.strftime("%Y-%m-%d"),
            }
        )

    return jsonify(output)


# ===============================
# ABSENT STUDENTS
# ===============================


@attendance_bp.route("/absent-students", methods=["GET"])
def absent_students():

    records = Attendance.query.filter_by(status="Absent").all()

    output = []

    for r in records:

        output.append(
            {
                "id": r.id,
                "student_name": r.student_name,
                "date": r.date.strftime("%Y-%m-%d"),
            }
        )

    return jsonify(output)
