from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import ForeignKey, Column
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), ForeignKey("users.id"), nullable = False)
    background_id = db.Column(db.Integer, ForeignKey("backgrounds.id"), nullable = False)
    hair_id = db.Column(db.Integer(), ForeignKey("hair.id"))
    face_id = db.Column(db.Integer(), ForeignKey("faces.id"))
    body_id = db.Column(db.Integer(), ForeignKey("bodies.id"))

    user = relationship("User", back_populates="avatars")
    background = relationship("Background", back_populates="backgrounds")
    hair = relationship("Hair", back_populates="hair")
    face = relationship("Face", back_populates="faces")
    body = relationship("Body", back_populates="bodies")
