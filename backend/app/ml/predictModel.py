import numpy as np

from app.ml.trainModel import train_model


def predict_risk(data):

    model = train_model()

    if model is None:
        return "Not enough data"

    features = np.array(
        [[data["attendance"], data["assignments"], data["absent"], data["present"]]]
    )

    prediction = model.predict(features)

    return prediction[0]
