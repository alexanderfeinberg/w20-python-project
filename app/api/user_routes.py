from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from app.models import Story
from app.errors import NotFoundError
from .helpers import get_user_model
from ..models.db import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# Get all Stories by a UserId
@user_routes.route("/<int:userId>/stories")
def all_user_stories(userId):
    stories = Story.query.filter(Story.user_id == userId).all()
    return jsonify({"Stories": [story.to_dict() for story in stories]})


# Follow a User by id
@user_routes.route("/<int:userId>/followers", methods=["POST"])
def follow_user(userId):
    following = User.query.get(userId)
    current = get_user_model(current_user, User)
    if not following:
        return NotFoundError("User not found.")

    current.following.append(following)
    db.commit()
    return {"message": "Successfully Followed", "statusCode": 201}


@user_routes.route('/<int:user_id>/followers')
def get_followers_of_user(user_id):
    user = User.query.get(user_id)
    if not user:
        raise NotFoundError(f'User {user_id} does not exist.')
    return jsonify({"Followers": [follower.to_dict() for follower in user.followers]})


@user_routes.route('/<int:user_id>/followers', methods=['DELETE'])
@login_required
def remove_follow(user_id):
    user = User.query.get(user_id)
    if not user:
        raise NotFoundError(f'User {user_id} does not exist.')
    current_user = get_user_model(current_user, User)
    # for follower in user.followers:
    #     if follower.id == current_user.id:
    #         break
    #     return {"message": f"Current user does not follow user {user_id}"}
    if current_user not in user.followers:
        return {"message": f"Current user does not follow user {user_id}"}

    user.followers.remove(current_user)
    db.session.commit()
    return {"message": f'Unfollowed user {user_id}'}
