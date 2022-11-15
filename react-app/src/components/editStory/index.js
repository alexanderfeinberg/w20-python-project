import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { getSingleStory, updateStory } from "../../store/story";

const EditStory = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state.story.singleStory)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const { storyId } = useParams()

    useEffect(() => {
        dispatch(getSingleStory(storyId))
    }, [])

    useEffect(() => {
            setTitle(story.title)
            setContent(story.content)
            setImage(story.image)
    }, [story])


    const submit = (e) => {
        e.preventDefault()
        const data = { title, image, content }
        dispatch(updateStory(storyId, data))
            .then(() => {
                history.push(`/users/${user.id}`)
            })
            .catch(() => {
                alert("failed")
            })
    }





    return (
        <form onSubmit={submit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // placeholder={story.title}
            />
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                // placeholder={story.content}
            />
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                // placeholder={story.image}
            />
            <button type="submit">Publish</button>
        </form>
    )
}

export default EditStory
