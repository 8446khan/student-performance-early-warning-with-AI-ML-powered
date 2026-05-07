from app import create_app, db
from app.models.model import classCoordinatoradd
from app.models.userAuthModel import userAuthTable


app = create_app()


with app.app_context():

    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
