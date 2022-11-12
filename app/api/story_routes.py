from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.story import Story
from ..errors import NotFoundError
from ..forms.story_form import StoryForm
from ..models import db
from datetime import datetime

story_routes = Blueprint('stories', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@story_routes.route('/')
def all_stories():
    stories = Story.query.all()
    print(stories)
    if not stories:
        return NotFoundError("No stories found.")

    return jsonify([story.to_dict() for story in stories])


@story_routes.route('/', methods=["POST"])
@login_required
def create_story():
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_story = Story(user=current_user,
                          title=form.data['title'],
                          image=form.data['image'],
                          content=form.data['content'],
                          created_at=datetime.now())
        return jsonify(new_story.to_dict())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
