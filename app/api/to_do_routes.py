from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import To_do
from flask import request
from app.models import db

to_do_routes = Blueprint('to_dos', __name__)


@to_do_routes.route('/<int:user_id>')
# @login_required
def to_dos(user_id):
    """
    Query for all to_dos and returns them in a list of to_do dictionaries
    """
    to_dos = To_do.query.filter(To_do.user_id == user_id)
    return {'to_dos': [to_do.to_dict() for to_do in to_dos]}


@to_do_routes.route('/<int:id>')
# @login_required
def to_do(id):
    """
    Query for a to_do by id and returns that to_do in a dictionary
    """
    to_do = To_do.query.get(id)
    return to_do.to_dict()

@to_do_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def to_do_update(id):
    """
    Query for a to_do by id and returns that to_do in a dictionary
    """
    to_do = To_do.query.get(id)
    title = request.json['title']
    checklist = request.json['checklist']
    difficulty = request.json['difficulty']
    notes = request.json['notes']
    tags = request.json['tags']
    user_id = request.json['userId']
    due_date = request.json['due_date']
    id = request.json['id']


    to_do.title = title
    to_do.checklist = checklist
    to_do.difficulty = difficulty
    to_do.notes = notes
    to_do.tags = tags
    to_do.user_id = user_id
    to_do.due_date = due_date
    db.session.commit()
    return to_do.to_dict()

@to_do_routes.route('/<int:id>', methods=["POST"])
# @login_required
def to_do_create():
    to_do = request.json
    title = request.json['title']
    checklist = request.json['checklist']
    difficulty = request.json['difficulty']
    notes = request.json['notes']
    tags = request.json['tags']
    user_id = request.json['userId']
    due_date = request.json['due_date']
    id = request.json['id']

    new_to_do = To_do
    new_to_do.title = title
    new_to_do.checklist = checklist
    new_to_do.difficulty = difficulty
    new_to_do.notes = notes
    new_to_do.tags = tags
    new_to_do.user_id = user_id
    new_to_do.due_date = due_date


    db.session.add(new_to_do)
    db.session.commit()
    return to_do.to_dict()

@to_do_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def to_do_delete(id):
    """
    Query for a to_do by id and returns that to_do in a dictionary
    """
    to_do = To_do.query.get(id)

    db.session.delete(to_do)
    db.session.commit()

    return to_do.to_dict()
