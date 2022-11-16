import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import './createStory.css';
import profileIcon from "../../assets/profile-icon.jpeg";
import mainLogo from "../../assets/main-logo-2.png"

const CreateStory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    setErrors([]);

    const data = { title, image, content };

    // if (!data.title.length) return setErrors(['Please provide a title.'])
    // if (!data.image.length) return setErrors(['Please provide an image.'])
    // if (!data.content.length) return setErrors(['Please provide a content.'])
    
    dispatch(createStory(data))
      .then(() => {
        history.push(`/users/${user.id}`);
      })
    
  };

    return (
        <>
        <div className="create-story-container">
            <div className="create-story-header">
                <div className="header-left">
                    <img className="header-home-logo" src={mainLogo} alt="Main Logo"
                        onClick={() => history.push('/')}/>
                    {user && <div className="header-author-info">Draft in {user.firstName} {user.lastName}               
                </div>} 
                </div>
                <img className="header-profile-icon" src={profileIcon} alt="Profile Icon"
                    onClick={() => history.push(`/users/${user.id}`)}/>
            </div>
            <div className="form-wrapper">
                <form className="form-container" onSubmit={submit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="imageurl"
                    />
                    <textarea
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell your story..."
                    />
                    <button className="create-story-button" type="submit">Publish</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateStory
