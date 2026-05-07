import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

from app.models.performanceModel import StudentPerformance


def train_model():

    records = StudentPerformance.query.all()

    if len(records) < 3:
        print("Not enough training data")
        return None

    X = []
    y = []

    for r in records:

        X.append(
            [
                r.attendance_percent,
                r.assignments_submitted,
                r.absent_days,
                r.present_days,
            ]
        )

        y.append(r.risk_label)

    X = np.array(X)
    y = np.array(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = LogisticRegression(max_iter=200)

    model.fit(X_train, y_train)

    print("Model trained successfully!")

    return model
