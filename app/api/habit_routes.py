from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Habit
from flask import request
from app.models import db

habit_routes = Blueprint('habits', __name__)


@habit_routes.route('/<int:userId>')
# @login_required
def habits(userId):
    """
    Query for all habits and returns them in a list of habit dictionaries
    """
    habits = Habit.query.filter(Habit.user_id == userId)
    return {'habits': [habit.to_dict() for habit in habits]}


@habit_routes.route('/<int:id>')
# @login_required
def habit(id):
    """
    Query for a habit by id and returns that habit in a dictionary
    """
    habit = Habit.query.get(id)
    return habit.to_dict()

@habit_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def habit_update(id):
    """
    Query for a habit by id and returns that habit in a dictionary
    """
    habit = Habit.query.get(id)
    title = request.json['title']
    completed = request.json['completed']
    difficulty = request.json['difficulty']
    notes = request.json['notes']
    tags = request.json['tags']
    streak = request.json['streak']
    user_id = request.json['userId']
    positive = request.json['positive']
    duration = request.json['duration']
    id = request.json['id']


    habit.title = title
    db.session.commit()
    return habit.to_dict()


@habit_routes.route('/', methods=["POST"])
# @login_required
def habit_create():
    habit = request.json
    completed = habit['completed']
    difficulty = habit['difficulty']
    duration = habit['duration']
    notes = habit['notes']
    positive = habit['positive']
    streak = habit['streak']
    tags = habit['tags']
    title = habit['title']
    user_id = habit['userId']
    new_habit = Habit(title = title,completed = completed,difficulty = difficulty,duration = duration,notes = notes,positive = positive,streak = streak,tags = tags,user_id = user_id)

    db.session.add(new_habit)
    db.session.commit()

    return request.json

@habit_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def habit_delete(id):
    """
    Query for a habit by id and returns that habit in a dictionary
    """
    habit = Habit.query.get(id)

    db.session.delete(habit)
    db.session.commit()

    return habit.to_dict()
