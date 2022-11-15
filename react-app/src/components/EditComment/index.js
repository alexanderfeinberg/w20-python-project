import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments, testComment, updateComment } from "../../store/comment"


const EditComment = ({ comment }) => {
    const dispatch = useDispatch()
    const commentId = comment.id

    const [content, setContent] = useState(comment.content)


    const cancelButton = () => {
        dispatch(testComment())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { content }
        console.log(comment)
        console.log("commentId-----------------", commentId)
        console.log("data-----------------", data)
        dispatch(updateComment(commentId, data))
            .then(() => {
                alert("success")
            })
            .catch(() => alert("fail"))
        console.log("--------------")
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="create_comment_form_container">
                <div className="create_comment_form_header">
                    <div className="create_comment_form_title">Change Comment</div>
                </div>
                <textarea
                    className="create_comment_form_input"
                    type="text"
                    value={content}
                    // placeholder="What are your thoughts?"
                    onChange={(e) => setContent(e.target.value)}
                // required
                />
                <button type="submit" className="create_comment_respond_button">Confirm</button>
                <button type="button" onClick={() => cancelButton()}className="create_comment_respond_button">Cancel</button>
            </form>
        </>
    )
}

export default EditComment
