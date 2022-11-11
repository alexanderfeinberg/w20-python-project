from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "stories.id"), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.Datetime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    story = db.relationship("Story", back_populates="comments")
