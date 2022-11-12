from flask import Blueprint, jsonify



story_routes = Blueprint('stories', __name__)

@story_routes.route("/")
def test():
    return "<h1>ayeee<h1>"
