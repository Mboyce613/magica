from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Daily, db
from datetime import date, datetime

daily_routes = Blueprint('dailies', __name__)

@daily_routes.route('/<int:id>', methods=["PUT"])
def daily_update(id):
    daily = Daily.query.get(id)

    if request.json['completed'] == "False" or request.json['completed'] == 'false':
        request.json['completed'] = False
    if request.json['completed'] == "True" or request.json['completed'] == 'true':
        request.json['completed'] = True

    title = request.json['title']
    notes = request.json['notes']
    difficulty = request.json['difficulty']
    duration = request.json['duration']
    tags = request.json['tags']
    start_date = request.json['start_date']
    days = request.json['days']
    checklist = request.json['checklist']
    completed = request.json['completed']

    daily.title = title
    daily.notes = notes
    daily.difficulty = difficulty
    daily.duration = duration
    daily.tags = tags
    daily.start_date = datetime.strptime(start_date, '%Y-%m-%d')
    daily.days = days
    daily.checklist = checklist
    daily.completed = completed
    db.session.commit()
    return daily.to_dict()
    

@daily_routes.route('/', methods=['POST'])
def post_daily():
    data = request.json

    if data['completed'] == "False" or data['completed'] == 'false':
        data['completed'] = False
    if data['completed'] == "True" or data['completed'] == 'true':
        data['completed'] = True

    date_to_start = data['start_date'].split('-')
    user_id = data['user_id']
    title = data['title']
    notes = data['notes']
    difficulty = data['difficulty']
    tags =data['tags']
    start_date =datetime(int(date_to_start[0]), int(date_to_start[1]), int(date_to_start[2]))
    days =data['days']
    checklist =data['checklist']
    streak =data['streak']
    completed =data['completed']
    duration =data['duration']


    new_daily = Daily(user_id = user_id, title=title, notes=notes, difficulty=difficulty, duration=duration, tags=tags, start_date=start_date, days=days, checklist=checklist, streak=streak, completed=completed)

    db.session.add(new_daily)
    db.session.commit()
    return new_daily.to_dict()
    
@daily_routes.route('/<int:userId>')
# @login_required
def dailies(userId):
    """
    Query for all dailies and returns them in a list of daily dictionaries
    """
    # dailies = Daily.query.all()
    dailies = Daily.query.filter(Daily.user_id == userId)
    return {'daily': [daily.to_dict() for daily in dailies]}


@daily_routes.route('/<int:id>')
# @login_required
def daily(id):
    """
    Query for a daily by id and returns that daily in a dictionary
    """
    daily = Daily.query.get(id)
    return daily.to_dict()

@daily_routes.route('/<int:id>', methods=["DELETE"])
def daily_delete(id):
    daily = Daily.query.get(id)

    db.session.delete(daily)
    db.session.commit()
    return daily.to_dict()