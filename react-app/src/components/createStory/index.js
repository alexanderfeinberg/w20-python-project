import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import './createStory.css';
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

        if (!data.title.length) return setErrors(['Please provide a title and it must be less than 200 characters.'])
        if (!data.image.length) return setErrors(['Please provide an image.'])
        if (!data.image.includes('.jpg') && !data.image.includes('.jpeg') && !data.image.includes('.png')) return setErrors(['Image must be in .jpg, .jpeg, or .png format']);
        if (!data.content.length) return setErrors(['Please provide a story.'])

        dispatch(createStory(data))
            .then(() => {
                history.push(`/users/${user.id}`);
            })
        //   .catch(() => {
        //     alert("failed");
        //   });

    };

    return (
        <>
            <div className="create-story-container">
                <div className="create-story-header">
                    <div className="header-left">
                        <img className="header-home-logo" src={mainLogo} alt="Main Logo"
                            onClick={() => history.push('/')} />
                        {user && <div className="header-author-info">Draft in {user.firstName} {user.lastName}
                        </div>}
                    </div>
                    <img className="header-profile-icon" src={user.profile_picture} alt="Profile Icon"
                        onClick={() => history.push(`/users/${user.id}`)} />
                </div>
                <div className="form-wrapper">
                    <form className="form-container" onSubmit={submit}>
                        <div className="errors">
                            {errors.length > 0 &&
                                errors.map((error) => <li key={error}>{error}</li>)}
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="input-title"
                        />
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image url"
                            className="input-image"
                        />
                        <textarea
                            className="create-story-textarea"
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
