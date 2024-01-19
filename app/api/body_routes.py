from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Body

body_routes = Blueprint('bodies', __name__)


@body_routes.route('/')
@login_required
def bodies():
    """
    Query for all bodies and returns them in a list of body dictionaries
    """
    bodies = Body.query.all()
    return {'bodies': [body.to_dict() for body in bodies]}


@body_routes.route('/<int:id>')
@login_required
def body(id):
    """
    Query for a body by id and returns that body in a dictionary
    """
    body = Body.query.get(id)
    print('!!!!!!!!!!!!!!!', body)
    return body.to_dict()
