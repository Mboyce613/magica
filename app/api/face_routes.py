from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Face

face_routes = Blueprint('faces', __name__)


@face_routes.route('/')
@login_required
def faces():
    """
    Query for all faces and returns them in a list of face dictionaries
    """
    faces = Face.query.all()
    return {'faces': [face.to_dict() for face in faces]}


@face_routes.route('/<int:id>')
@login_required
def face(id):
    """
    Query for a face by id and returns that face in a dictionary
    """
    face = Face.query.get(id)
    return face.to_dict()
