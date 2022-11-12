from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Comment, db, User
from app.forms.comment_form import CommentForm
from datetime import datetime
from app.errors import NotFoundError
from .helpers import child_belongs_to_parent, get_user_model

comment_routes = Blueprint('comments', __name__)

# Edit a Comment


@comment_routes.route('/<int:comment_id>', methods=["PUT"])
@login_required
def edit_comment(comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        edited_comment = Comment.query.get(comment_id)
    if edited_comment:
        child_belongs_to_parent(get_user_model(
            current_user, User), edited_comment, 'user_id')
        edited_comment.content = data['content']
        edited_comment.created_at = datetime.now()
        db.session.commit()
        return jsonify(edited_comment.to_dict())
    else:
        return NotFoundError("Comment can't be found")


# Delete a Comment
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    deleted_comment = Comment.query.get(comment_id)
    if delete_comment:
        child_belongs_to_parent(get_user_model(
            current_user, User), delete_comment, 'user_id')
        db.session.delete(deleted_comment)
        db.session.commit()
        return {"message": "Comment successfully deleted."}
    else:
        return NotFoundError("Comment couldn't be found")
