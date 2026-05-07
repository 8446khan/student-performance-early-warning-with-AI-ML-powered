import pickle
import numpy as np
import os

# Load Model
model_path = os.path.join(os.path.dirname(__file__), "student_model.pkl")

model = pickle.load(open(model_path, "rb"))


def predict_student(attendance, assignment, study_hours):

    features = np.array([[attendance, assignment, study_hours]])

    prediction = model.predict(features)

    score = round(prediction[0], 2)

    # Grade Logic
    if score >= 85:
        grade = "Excellent"

    elif score >= 70:
        grade = "Good"

    elif score >= 50:
        grade = "Average"

    else:
        grade = "Needs Improvement"

    return {"predicted_score": score, "grade": grade}
