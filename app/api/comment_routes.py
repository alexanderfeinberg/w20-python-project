from flask import Blueprint, request
from flask_login import login_required
from app.models import Comment, db
from app.forms.comment_form import CommentForm
from app.errors import NotFoundError
comment_routes = Blueprint('comments', __name__)

# Edit a Comment 
@comment_routes.route('/<int:commentId>', methods=["PUT"])
@login_required
def edit_comment(commentId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_comment = Comment.query.get(commentId)
    if edit_comment:
        edit_comment.content = form.data['content']
        db.session.commit()
        return edit_comment.to_dict()
    else: 
        return NotFoundError("Comment can't be found")


# Delete a Comment
@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    delete_comment = Comment.query.get(commentId)
    if delete_comment: 
        db.session.delete(delete_comment)
        db.session.commit()
        return {"message": "Successfully deleted!"}
    else: 
        return NotFoundError("Comment couldn't be found")