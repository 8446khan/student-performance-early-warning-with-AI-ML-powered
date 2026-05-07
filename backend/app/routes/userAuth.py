from flask import Flask, Blueprint
from app.models.userAuthModel import userAuthTable
from app.models.model import classCoordinatoradd

# from app.models.model import userAuthTable
from flask import jsonify
from app import db
from flask import request
from flask_jwt_extended import create_access_token

# from flask_cors import cross_origin


userAuth_bp = Blueprint("userAuth", __name__)


@userAuth_bp.route("/signup", methods=["POST", "GET"])
def signup():

    if request.method == "GET":
        users = userAuthTable.query.all()

        output = []

        for user in users:
            user_data = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "mobileno": user.mobileno,
                "password": user.password,
            }

            output.append(user_data)

        return jsonify(output)
    else:
        data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    mobileno = data.get("mobileno")
    password = data.get("password")
    role = data.get("role")

    existing_user = userAuthTable.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "Email already registered"}), 400

    new_user = userAuthTable(
        name=name, email=email, mobileno=mobileno, password=password, role=role
    )
    print(new_user)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@userAuth_bp.route("/login", methods=["POST"])
def Login():

    data = request.get_json()

    email = data.get("email")

    password = data.get("password")
    role = data.get("role")

    user = userAuthTable.query.filter_by(
        email=email, password=password, role=role
    ).first()
    # student = classCoordinatoradd.query.filter_by(parentContact=mobileno).first()

    # if student:
    #     return jsonify(
    #         {
    #             "name": student.fullname,
    #             "rollno": student.rollno,
    #             "ienno": student.ienno,
    #             "branch": student.branch,
    #         }
    #     )
    # else:
    #     return jsonify({"message": "no student exixt"})

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

        # 🔐 Create JWT token

    token = create_access_token(identity={"id": user.id, "role": user.role})

    return jsonify(
        {"message": f"{role} login successful", "token": token, "role": role}
    )
