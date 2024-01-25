from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Avatar, db


avatar_routes = Blueprint('avatars', __name__)


@avatar_routes.route('/')

@login_required
def avatars():
    """
    Query for all avatars and returns them in a list of avatar dictionaries
    """
    avatars = Avatar.query.all()
    return {'avatars': [avatar.to_dict() for avatar in avatars]}


@avatar_routes.route('/<int:id>')
@login_required
def avatar(id):
    """
    Query for an avatar by id and returns that avatar in a dictionary
    """
    avatar = Avatar.query.get(id)
    return avatar.to_dict()

@avatar_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def updateAvatarBackground(id):
    """
    Query for an avatar by id and returns that avatar in a dictionary
    """
    avatar = Avatar.query.get(id)
    backgroundId = request.json['backgroundId']
    hairId = request.json['hairId']
    faceId = request.json['faceId']
    bodyId = request.json['bodyId']


    avatar.background_id = backgroundId
    avatar.hair_id = hairId
    avatar.face_id = faceId
    avatar.body_id = bodyId
    
    db.session.add(avatar)
    db.session.commit()
    return avatar.to_dict()

@avatar_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def avatarDelete(id):
    """
    Query for an avatar by id and returns that avatar in a dictionary
    """
    avatar = Avatar.query.get(id)
    db.session.delete(avatar)
    db.session.commit()

    avatar = Avatar(
            id = id,
            user_id = id,
            background_id = 1,
            hair_id = 1,
            face_id = 1,
            body_id = 1
            )
    db.session.add(avatar)
    db.session.commit()
    return avatar.to_dict()