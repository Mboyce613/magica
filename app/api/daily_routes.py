from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Daily

daily_routes = Blueprint('dailies', __name__)

@daily_routes.route('/', methods=['POST'])
def post_daily():
    recieved_data = request.json
    
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
