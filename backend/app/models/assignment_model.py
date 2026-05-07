from app import db
from datetime import datetime


class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    date_uploaded = db.Column(db.String(50), nullable=False)
