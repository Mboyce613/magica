from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}




    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    title = db.Column(db.String(255), nullable = False)
    notes = db.Column(db.String(255))
    difficulty = db.Column(db.Integer, nullable = False)
    duration = db.Column(db.Integer, nullable = False)
    tags = db.Column(db.String(255),)
    start_date = db.Column(db.Date, nullable = False)
    days = db.Column(db.String(255), nullable = False)
    checklist = db.Column(db.String(255),)
    streak = db.Column(db.Integer, nullable = False)
    completed = db.Column(db.Boolean, nullable = False)

    user = relationship("User", back_populates="daily")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'duration': self.duration,
            'tags': self.tags,
            'start_date': self.start_date,
            'days': self.days,
            'checklist': self.checklist,
            'streak': self.streak,
            'completed': self.completed
        }