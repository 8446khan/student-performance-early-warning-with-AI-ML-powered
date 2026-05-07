from app import db


# 👨‍👩‍👧 Parent Table
class userAuthTable(db.Model):

    __tablename__ = "parent"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    mobileno = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=True)
