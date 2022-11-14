import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import createComment from '../../store/comment';

import './CreateCommentForm.css';

function CreateCommentForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const storyId = useParams();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    let Comment = {content}

    if (!Comment.content.length){
      return setErrors(['Please provide a response.'])
    }

    const payload = {
      content
    }
    
    let createdComment;

    createdComment = dispatch(createComment(payload));

    if (createComment) {
      history.push(`/stories/${storyId}`);
    }
  };
  
  const cancelHandler = (e) => {
    e.preventDefault();
    history.push(`/stories/${storyId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="create_comment_form_container">
      <div className="create_comment_form_header">
        <div className="create_comment_form_title">Responses</div>
      </div>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <input
          className="create_comment_form_input"
          type="text"
          value={content}
          placeholder="What are your thoughts?"
          onChange={(e) => setContent(e.target.value)}
          required
        />
      <button type="submit" className="create_comment_respond_button">Respond</button>
      <button type="submit" className="create_comment_cancel_button"  onClick={cancelHandler}
        >
        Cancel
      </button>
    </form>
  );
}

export default CreateCommentForm;