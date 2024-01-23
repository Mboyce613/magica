from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import To_do

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

