import os
from flask import Blueprint, jsonify, current_app, send_from_directory, request
from werkzeug.utils import secure_filename
from urllib.parse import unquote
from PyPDF2 import PdfReader

# Optional OCR support
# pip install pytesseract pillow pdf2image
# Uncomment these lines if you want OCR for scanned PDFs
# from pdf2image import convert_from_path
# import pytesseract

timetable_bp = Blueprint("timetable", __name__)

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ---------------- UPLOAD ----------------
@timetable_bp.route("/upload-timetable", methods=["POST"])
def upload_timetable():
    try:
        if "file" not in request.files:
            return jsonify({"message": "No file provided"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"message": "No selected file"}), 400

        if not allowed_file(file.filename):
            return jsonify({"message": "Only PDF, JPG, PNG allowed"}), 400

        filename = secure_filename(file.filename)
        upload_folder = current_app.config["UPLOAD_FOLDER"]
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)

        return (
            jsonify(
                {
                    "message": "File uploaded successfully",
                    "filename": filename,
                    "url": f"http://127.0.0.1:5000/uploads/{filename}",
                }
            ),
            200,
        )

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        return jsonify({"message": "Upload failed", "error": str(e)}), 500


# ---------------- GET FILE ----------------
@timetable_bp.route("/uploads/<path:filename>", methods=["GET"])
def get_file(filename):
    filename = unquote(filename)
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)


# ---------------- LIST FILES ----------------
@timetable_bp.route("/timetables", methods=["GET"])
def get_all():
    try:
        files = os.listdir(current_app.config["UPLOAD_FOLDER"])
        return (
            jsonify(
                {"files": [f"http://127.0.0.1:5000/uploads/{file}" for file in files]}
            ),
            200,
        )
    except Exception as e:
        print("LIST ERROR:", str(e))
        return jsonify({"message": "Error fetching files"}), 500


# ---------------- DELETE FILE ----------------
@timetable_bp.route("/delete-timetable/<path:filename>", methods=["DELETE"])
def delete_timetable(filename):
    try:
        filename = unquote(filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)

        if not os.path.isfile(filepath):
            return jsonify({"message": "File not found", "filepath": filepath}), 404

        os.remove(filepath)
        return jsonify({"message": "File deleted successfully"}), 200

    except Exception as e:
        print("DELETE ERROR:", str(e))
        return jsonify({"message": "Delete failed", "error": str(e)}), 500


# ---------------- EXTRACT PDF (Dynamic Table) ----------------
@timetable_bp.route("/extract/<path:filename>", methods=["GET"])
def extract_pdf(filename):
    try:
        filename = unquote(filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)

        if not os.path.isfile(filepath):
            return jsonify({"message": "File not found", "data": []}), 404

        if not filename.lower().endswith(".pdf"):
            return jsonify({"message": "Extraction only supports PDF", "data": []}), 400

        # Extract text from PDF
        reader = PdfReader(filepath)
        text = ""
        for i, page in enumerate(reader.pages):
            try:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
                else:
                    print(f"Page {i+1} has no extractable text.")
            except Exception as e:
                print(f"Error extracting page {i+1}: {str(e)}")

        # Optional OCR fallback (for scanned PDFs)
        # if not text.strip():
        #     print("Using OCR fallback...")
        #     images = convert_from_path(filepath)
        #     for img in images:
        #         text += pytesseract.image_to_string(img) + "\n"

        if not text.strip():
            return jsonify({"message": "No text found. Try OCR.", "data": []})

        # Dynamic table rows: split each line, then split by spaces/tabs
        rows = []
        for line in text.split("\n"):
            line = line.strip()
            if line:
                row = line.split()  # Adjust here if your PDF uses tabs
                rows.append(row)

        return jsonify({"message": "Text extracted successfully", "data": rows})

    except Exception as e:
        print("EXTRACT ERROR:", str(e))
        return (
            jsonify({"message": "Extraction failed", "error": str(e), "data": []}),
            500,
        )
