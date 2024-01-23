from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Daily, db

daily_routes = Blueprint('dailies', __name__)

@daily_routes.route('/', methods=['POST'])
def post_daily():
    data = request.json
    
    user_id = data['user_id']
    title = data['title']
    notes = data['notes']
    difficulty = data['difficulty']
    tags =data['tags']
    start_date =data['start_date']
    days =data['days']
    checklist =data['checklist']
    streak =data['streak']
    completed =data['completed']
    duration =data['duration']


    new_daily = Daily(user_id, title, notes, difficulty, duration, tags, start_date, days, checklist, streak, completed)

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
