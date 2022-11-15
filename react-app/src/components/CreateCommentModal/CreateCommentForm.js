import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createComment, getAllComments } from '../../store/comment';

import './CreateCommentForm.css';

function CreateCommentForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {storyId} = useParams();

  // const story = useSelector(state => state.story.singleStory);
  const comments = useSelector(state => state.comment.allComments);
  const commentsArr = Object.values(comments);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllComments(storyId))
  }, [dispatch, storyId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    let comment = {content}

    if (!comment.content.length){
      return setErrors(['Please provide a response.'])
    }

    let createdComment;

    createdComment = dispatch(createComment(storyId, comment));

    if (createdComment) {
      history.push(`/stories/${storyId}`);
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push(`/stories/${storyId}`);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="create_comment_form_container">
      <div className="create_comment_form_header">
        <div className="create_comment_form_title">Responses ()</div>
      </div>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <textarea
          className="create_comment_form_input"
          type="text"
          value={content}
          placeholder="What are your thoughts?"
          onChange={(e) => setContent(e.target.value)}
          // required
        />
      <button type="submit" className="create_comment_cancel_button"  onClick={cancelHandler}>Cancel</button>
      <button type="submit" className="create_comment_respond_button">Respond</button>
    </form>

    <div className="all_comments">
      <h3>Comments</h3>
        {commentsArr.map((comment) => {
          return (
            <>
            <div className="create_comment_container">
              <div className="create_comment_user_info">{comment.user.profile_picture}</div>
              <div className="create_comment_user_info2">{comment.user.firstName} {comment.user.lastName} </div>
              <div className="create_comment_date">{comment.created_at.slice(5, 11)}</div>
              <div className="create_comment_content">{comment.content}</div>
            </div>
          </>
          )
        })}
    </div>
  </>
  );
}

export default CreateCommentForm;
