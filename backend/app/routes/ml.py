from flask import Blueprint, request, jsonify
from app.ml.predict import predict_student

ml_bp = Blueprint("ml", __name__)


@ml_bp.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    attendance = data.get("attendance")
    assignment = data.get("assignment")
    study_hours = data.get("study_hours")

    result = predict_student(attendance, assignment, study_hours)

    return jsonify(result)
