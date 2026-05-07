from app import db


class Teacher(db.Model):
    __tablename__ = "teachers"

    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    ContactNo = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    # image_filename = db.Column(db.String(200))  # optional

    def to_dict(self):
        return {
            "id": self.id,
            "fullName": self.fullName,
            "subject": self.subject,
            "ContactNo": self.ContactNo,
            "email": self.email,
            # "image": self.image_filename
        }
