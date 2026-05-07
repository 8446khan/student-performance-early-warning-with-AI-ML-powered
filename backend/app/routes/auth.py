from flask import Blueprint, jsonify, request
from app.models.model import classCoordinatoradd
from app.models.userAuthModel import userAuthTable
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)


# ------------------------------
# GET ALL STUDENTS
# ------------------------------
@auth_bp.route("/users", methods=["GET"])
def get_all_users():

    users = classCoordinatoradd.query.all()
    output = []

    for user in users:
        user_data = {
            "id": user.id,
            "fullname": user.fullname,
            "rollNo": user.rollno,
            "ienNo": user.ienno,
            "branch": user.branch,
            "email": user.email,
            "parentName": user.parentName,
            "parentContact": user.parentContact,
        }

        output.append(user_data)

    return jsonify(output)


# ------------------------------
# GET SINGLE STUDENT
# ------------------------------
@auth_bp.route("/users/<int:id>", methods=["GET"])
def get_user(id):

    user = classCoordinatoradd.query.get_or_404(id)

    return jsonify(
        {
            "id": user.id,
            "fullname": user.fullname,
            "rollNo": user.rollno,
            "ienNo": user.ienno,
            "branch": user.branch,
            "email": user.email,
            "parentName": user.parentName,
            "parentContact": user.parentContact,
        }
    )


# ------------------------------
# ADD STUDENT
# ------------------------------
@auth_bp.route("/user", methods=["POST"])
def add_user():

    fullname = request.form.get("fullName")
    rollno = request.form.get("rollNo")
    ienno = request.form.get("ienNo")
    branch = request.form.get("branch")
    email = request.form.get("email")

    parentName = request.form.get("parentName")
    parentContact = request.form.get("parentContact")

    # Save student
    user = classCoordinatoradd(
        fullname=fullname,
        rollno=rollno,
        ienno=ienno,
        branch=branch,
        email=email,
        parentName=parentName,
        parentContact=parentContact,
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Student added successfully"})


# ------------------------------
# PARENT: GET THEIR CHILD
# (Using Mobile Match)
# ------------------------------
@auth_bp.route("/parent/mychild", methods=["GET"])
@jwt_required()
def get_my_child():

    current_user = get_jwt_identity()

    # Role check
    if current_user["role"] != "parent":
        return jsonify({"msg": "Unauthorized"}), 403

    parent_id = current_user["id"]

    # Get parent mobile number
    parent = userAuthTable.query.get(parent_id)

    parent_mobile = parent.mobileno

    # Match student parentContact
    students = classCoordinatoradd.query.filter_by(parentContact=parent_mobile).all()

    output = []

    for student in students:
        student_data = {
            "id": student.id,
            "fullname": student.fullname,
            "rollNo": student.rollno,
            "ienNo": student.ienno,
            "branch": student.branch,
            "email": student.email,
        }

        output.append(student_data)

    return jsonify(output)


# ------------------------------
# ADD TEACHER
# ------------------------------
@auth_bp.route("/addteacher", methods=["POST"])
def add_teacher():

    data = request.get_json()

    fullName = data.get("fullName")
    subject = data.get("subject")
    ContactNo = data.get("ContactNo")
    email = data.get("email")

    teacher = TeacherTable(
        fullName=fullName, subject=subject, ContactNo=ContactNo, email=email
    )

    db.session.add(teacher)
    db.session.commit()

    return jsonify({"message": "Teacher added successfully"})


# ------------------------------
# GET ALL TEACHERS
# ------------------------------
@auth_bp.route("/teachers", methods=["GET"])
def get_teachers():

    teachers = TeacherTable.query.all()

    output = []

    for teacher in teachers:
        teacher_data = {
            "id": teacher.id,
            "fullName": teacher.fullName,
            "subject": teacher.subject,
            "ContactNo": teacher.ContactNo,
            "email": teacher.email,
        }

        output.append(teacher_data)

    return jsonify(output)


# GET single student
@auth_bp.route("/users/<int:id>", methods=["GET"])
def get_student(id):
    student = classCoordinatoradd.query.get(id)  # Use the correct student model
    if not student:
        return jsonify({"error": "Student not found"}), 404

    return (
        jsonify(
            {
                "id": student.id,
                "fullname": student.fullname,
                "rollNo": student.rollno,
                "ienNo": student.ienno,
                "branch": student.branch,
                "email": student.email,
                "parentName": student.parentName,
                "parentContact": student.parentContact,
            }
        ),
        200,
    )


# UPDATE student
@auth_bp.route("/users/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.get_json()
    student = classCoordinatoradd.query.get_or_404(id)  # same model
    student.fullname = data.get("fullname", student.fullname)
    student.rollno = data.get("rollNo", student.rollno)
    student.ienno = data.get("ienNo", student.ienno)
    student.branch = data.get("branch", student.branch)
    db.session.commit()
    return jsonify({"message": "Student updated successfully"})
