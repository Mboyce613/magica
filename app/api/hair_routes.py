from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Hair

hair_routes = Blueprint('hairs', __name__)


@hair_routes.route('/')
# @login_required
def hairs():
    """
    Query for all hairs and returns them in a list of hair dictionaries
    """
    hairs = Hair.query.all()
    return {'hairs': [hair.to_dict() for hair in hairs]}


@hair_routes.route('/<int:id>')
@login_required
def hair(id):
    """
    Query for a hair by id and returns that hair in a dictionary
    """
    hair = Hair.query.get(id)
    return hair.to_dict()
