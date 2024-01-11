from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Background(db.Model):
    __tablename__ = 'backgrounds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer(), primary_key = True)
    url = db.Column(db.String(255))
    avatar = relationship("Avatar", back_populates="backgrounds")
