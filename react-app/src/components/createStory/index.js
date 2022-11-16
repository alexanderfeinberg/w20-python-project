import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import './createStory.css';
import profileIcon from "../../assets/profile-icon.jpeg";

const CreateStory = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")

    const submit = (e) => {
        e.preventDefault()
        const data = { title, image, content }
        console.log(data)
        dispatch(createStory(data))
        .then(() => {
            history.push(`/users/${user.id}`)
        })
        .catch(() => {
            alert("failed")
        })
    }





    return (
        <>
        <div className="create-story-container">
            {user && <div className="create-story-header">Draft in {user.firstName} {user.lastName}               
                <button className="create-story-button" type="submit">Publish</button>
                    <img className="profile-icon" src={profileIcon} alt="Profile Icon"/>
                </div>} 

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
                        // style={min-height=10px}
                    />
                    <textarea
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell your story..."
                    />
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateStory
