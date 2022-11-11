from .db import db


class Story(db.Model):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String)
    content = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="stories")
    comments = db.relationship("Comment", back_populates="story")
    likes = db.relationship("Like", back_populates="story")
