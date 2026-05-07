from flask import Blueprint, request, jsonify, current_app, send_from_directory
from app import db
from app.models.assignment_model import Assignment
from app.models.announcementModel import Announcement
import os
from datetime import datetime

ml_assignments = Blueprint("ml_assignments", __name__)


# ================= UPLOAD ASSIGNMENT =================
@ml_assignments.route("/upload-assignment", methods=["POST"])
def upload_assignment():
    title = request.form.get("title")
    file = request.files.get("file")

    if not title or not file:
        return jsonify({"error": "Title and file are required"}), 400

    # Ensure UPLOAD_FOLDER exists
    upload_folder = current_app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)

    assignment = Assignment(
        title=title,
        filename=filename,
        date_uploaded=datetime.now().strftime("%Y-%m-%d"),
    )
    db.session.add(assignment)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Assignment uploaded successfully",
                "assignment": {
                    "id": assignment.id,
                    "title": assignment.title,
                    "filename": assignment.filename,
                    "date_uploaded": assignment.date_uploaded,
                },
            }
        ),
        201,
    )


# ================= VIEW ASSIGNMENTS =================
@ml_assignments.route("/assignments", methods=["GET"])
def view_assignments():
    assignments = Assignment.query.order_by(Assignment.id.desc()).all()
    result = [
        {
            "id": a.id,
            "title": a.title,
            "filename": a.filename,
            "date_uploaded": a.date_uploaded,
        }
        for a in assignments
    ]
    return jsonify(result), 200


# ================= DOWNLOAD ASSIGNMENT =================
@ml_assignments.route("/assignments/download/<filename>", methods=["GET"])
def download_assignment(filename):
    upload_folder = current_app.config.get("UPLOAD_FOLDER", "uploads")
    return send_from_directory(upload_folder, filename, as_attachment=True)


# ================= POST ANNOUNCEMENT =================
@ml_assignments.route("/announcements", methods=["POST"])
def post_announcement():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "Announcement text required"}), 400

    announcement = Announcement(
        text=text, date_posted=datetime.now().strftime("%Y-%m-%d")
    )
    db.session.add(announcement)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Announcement posted",
                "announcement": {
                    "id": announcement.id,
                    "text": announcement.text,
                    "date_posted": announcement.date_posted,
                },
            }
        ),
        201,
    )


# ================= GET ANNOUNCEMENTS =================
@ml_assignments.route("/announcements", methods=["GET"])
def get_announcements():
    announcements = Announcement.query.order_by(Announcement.id.desc()).all()
    result = [
        {"id": a.id, "text": a.text, "date_posted": a.date_posted}
        for a in announcements
    ]
    return jsonify(result), 200
