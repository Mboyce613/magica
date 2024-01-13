from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import ForeignKey, Column
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    background_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("backgrounds.id")), nullable = False)
    hair_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("hair.id")))
    face_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("faces.id")))
    body_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("bodies.id")))

    user = relationship("User", back_populates="avatar")
    background = relationship("Background", back_populates="avatar")
    hair = relationship("Hair", back_populates="avatar")
    face = relationship("Face", back_populates="avatar")
    body = relationship("Body", back_populates="avatar")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'backgroundId': self.background_id,
            'hairId': self.hair_id,
            'faceId': self.face_id,
            'bodyId': self.body_id
        }