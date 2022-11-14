import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../store/session";
import './CreateCommentForm.css';

function CreateCommentForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content){
      return setErrors(['Please provide a response.'])
    }

    setErrors([]);
    return dispatch(sessionActions.login({ content })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="Create_Comment_Form_Container">
      <div className="Create_Comment_Form_Header">
        <div className="Create_Comment_Form_Title">Responses</div>
      </div>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <input
          className="Create_Comment_Form_Input"
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