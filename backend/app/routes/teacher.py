from flask import Blueprint, request, jsonify
from app import db
from app.models.teacher import Teacher

teacher_bp = Blueprint("teacher_bp", __name__)


@teacher_bp.route("/addteacher", methods=["POST"])
def add_teacher():
    try:
        fullName = request.form.get("fullName")
        subject = request.form.get("subject")
        ContactNo = request.form.get("ContactNo")
        email = request.form.get("email")

        if not all([fullName, subject, ContactNo, email]):
            return jsonify({"error": "All fields are required"}), 400

        new_teacher = Teacher(
            fullName=fullName, subject=subject, ContactNo=ContactNo, email=email
        )
        db.session.add(new_teacher)
        db.session.commit()

        print("Teacher added:", new_teacher.to_dict())  # debug

        return (
            jsonify(
                {
                    "message": "Teacher added successfully!",
                    "teacher": new_teacher.to_dict(),
                }
            ),
            201,
        )

    except Exception as e:
        db.session.rollback()
        print("ERROR:", e)  # debug
        return jsonify({"error": str(e)}), 500


@teacher_bp.route("/teachers", methods=["GET"])
def get_teachers():
    try:
        teachers = Teacher.query.all()
        return jsonify([t.to_dict() for t in teachers]), 200
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ✅ Get teacher details by ID
@teacher_bp.route("/teacher/<int:teacher_id>", methods=["GET"])
def get_teacher(teacher_id):
    try:
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404
        return jsonify(teacher.to_dict()), 200
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500
