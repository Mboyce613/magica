from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Habit(db.Model):
    __tablename__ = 'habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), ForeignKey("users.id"), nullable = False)
    title = db.Column(db.String(255), nullable = False)
    notes = db.Column(db.String(255))
    difficulty = db.Column(db.Integer, nullable = False)
    duration = db.Column(db.Integer, nullable = False)
    tags = db.Column(db.String(255), nullable = False)
    positive = db.Column(db.Boolean, nullable = False)
    streak = db.Column(db.Integer, nullable = False)
    completed = db.Column(db.Boolean, nullable = False)

    user = relationship("User", back_populates="users")
