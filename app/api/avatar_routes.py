from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Avatar

avatar_routes = Blueprint('avatars', __name__)


@avatar_routes.route('/')

# @login_required
def avatars():
    """
    Query for all avatars and returns them in a list of avatar dictionaries
    """
    avatars = Avatar.query.all()
    return {'avatars': [avatar.to_dict() for avatar in avatars]}


@avatar_routes.route('/<int:id>')
# @login_required
def avatar(id):
    """
    Query for an avatar by id and returns that avatar in a dictionary
    """
    avatar = Avatar.query.get(id)
    return avatar.to_dict()
