from flask import Blueprint, jsonify

from app.ml.predictModel import predict_risk
from app.models.performanceModel import StudentPerformance

ml_bprisk = Blueprint("ml_bprisk", __name__)


@ml_bprisk.route("/predict-risk/<int:student_id>", methods=["GET"])
def predict_student_risk(student_id):

    # 🔍 Get student performance record
    record = StudentPerformance.query.filter_by(student_id=student_id).first()

    if not record:
        return jsonify({"risk": "No performance data"})

    # 📊 Prepare data dictionary
    data = {
        "attendance": record.attendance_percent,
        "assignments": record.assignments_submitted,
        "absent": record.absent_days,
        "present": record.present_days,
    }

    # 🎯 Predict Risk
    result = predict_risk(data)

    return jsonify({"risk": result})
