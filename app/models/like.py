from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(
        "stories.id"), nullable=False)
    count = db.Column(db.Integer)

    story = db.relationship("Story", back_populates="likes")
    user = db.relationship("User", back_populates="likes")
