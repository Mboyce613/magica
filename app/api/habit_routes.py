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

    habit.title = title
    db.session.commit()
    
    return habit.to_dict()
