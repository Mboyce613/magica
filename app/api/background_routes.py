from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Background

background_routes = Blueprint('backgrounds', __name__)


@background_routes.route('/')
@login_required
def backgrounds():
    """
    Query for all backgrounds and returns them in a list of background dictionaries
    """
    backgrounds = Background.query.all()
    return {'backgrounds': [background.to_dict() for background in backgrounds]}


@background_routes.route('/<int:id>')
@login_required
def background(id):
    """
    Query for a background by id and returns that background in a dictionary
    """
    background = Background.query.get(id)
    return background.to_dict()
