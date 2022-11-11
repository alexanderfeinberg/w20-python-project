from .db import db


class Follower(db.Model):
    __tablename__ = "followers"
    # Adding index as (follower_id, following_id) ??
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.Datetime, nullable=False, default=datetime.now())

    followed_user = db.relationship(
        "User", foreign_keys=[follower_id], back_populates="users_followers")
    user = db.relationship("User", foreign_keys=[following_id],
                           back_populates="followings")  # ?
