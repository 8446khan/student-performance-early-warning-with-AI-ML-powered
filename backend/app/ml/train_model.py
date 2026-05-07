import numpy as np
from sklearn.linear_model import LinearRegression
import pickle
import os

# Training Data

X = np.array(
    [
        [90, 85, 3],
        [80, 70, 2],
        [75, 60, 2],
        [60, 50, 1],
        [95, 90, 4],
        [50, 40, 1],
        [85, 80, 3],
        [70, 65, 2],
    ]
)

y = np.array([90, 75, 70, 55, 95, 45, 85, 65])

model = LinearRegression()

model.fit(X, y)

# Save Model

model_path = os.path.join(os.path.dirname(__file__), "student_model.pkl")

pickle.dump(model, open(model_path, "wb"))

print("Model trained successfully!")
