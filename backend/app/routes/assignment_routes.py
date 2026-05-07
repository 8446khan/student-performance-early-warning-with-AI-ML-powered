import os

from flask import Blueprint
from flask import request
from flask import jsonify

from werkzeug.utils import secure_filename

from app import db
from app.models.assignment_model import Assignment


assignment_bp = Blueprint("assignment", __name__)


# Upload folder
UPLOAD_FOLDER = "uploads"

# Create folder if not exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

from flask import send_from_directory


@assignment_bp.route("/uploads/<filename>")
def uploaded_file(filename):

    return send_from_directory("uploads", filename)


# ✅ ADD ASSIGNMENT (PDF Upload)
@assignment_bp.route("/add-assignment", methods=["POST"])
def add_assignment():

    try:

        title = request.form.get("title")
        # description = request.form.get("description")

        file = request.files.get("file")

        filename = None

        # Save file
        if file:

            filename = secure_filename(file.filename)

            file_path = os.path.join(UPLOAD_FOLDER, filename)

            file.save(file_path)

        # Save to DB
        new_assignment = Assignment(title=title, description=description, file=filename)

        db.session.add(new_assignment)

        db.session.commit()

        return jsonify({"message": "Assignment added successfully"})

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# ✅ GET ALL ASSIGNMENTS
@assignment_bp.route("/assignments", methods=["GET"])
def get_assignments():

    assignments = Assignment.query.all()

    output = []

    for a in assignments:

        output.append(a.to_dict())

    return jsonify(output)
