import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()


def create_app():

    app = Flask(__name__)

    app.config["SECRET_KEY"] = "your-secret-key"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mimi.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "super-secret-key"

    UPLOAD_FOLDER = os.path.join(os.getcwd(), "app", "uploads")

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

    db.init_app(app)
    JWTManager(app)
    # Enable CORS properly
    CORS(app, origins=["http://localhost:5173"])
    from app.routes.auth import auth_bp
    from app.routes.userAuth import userAuth_bp
    from app.routes.timetable import timetable_bp
    from app.routes.assignment_routes import assignment_bp

    from app.routes.attendance import attendance_bp
    from app.routes.teacher import teacher_bp
    from app.routes.ml import ml_bp
    from app.routes.mlRoutes import ml_bprisk

    # ✅ Import Blueprint correctly
    from app.routes.ml_assignments import ml_assignments

    # ✅ Register Blueprint
    app.register_blueprint(ml_assignments)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(userAuth_bp)
    app.register_blueprint(timetable_bp)
    app.register_blueprint(assignment_bp)
    app.register_blueprint(attendance_bp)
    app.register_blueprint(teacher_bp)
    app.register_blueprint(ml_bp, url_prefix="/ml")
    app.register_blueprint(ml_bprisk)

    return app
