from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models.story import Story
from ..errors import NotFoundError
from ..forms.story_form import StoryForm
from ..models import db

story_routes = Blueprint('stories', __name__)


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
    if form.validate_on_submit():
        print("FORM DATA ", form.data)
        new_story = Story(user=current_user, **form.data)
