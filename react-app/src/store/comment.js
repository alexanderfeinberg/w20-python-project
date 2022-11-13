import {csrfFetch} from "./csrf"
const LOAD_ALL_COMMENTS = "/comments/LOAD_ALL_COMMENTS"
const NEW_COMMENT = "/comments/NEW_COMMENT"
const EDIT_COMMENT = "/comments/EDIT_COMMENT"
const DESTROY_COMMENT = "/comments/DESTROY_COMMENT"


// ACTIONS
const allComments = (comments) => {
    return {
        type: LOAD_ALL_COMMENTS,
        comments
    }
}

const newComment = (comment) => {
    return {
        type: NEW_COMMENT,
        comment
    }
}

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

const destroyComment = (comment) => {
    return {
        type: DESTROY_COMMENT,
        comment
    }
}


// THUNKS

// Get All Comment
const getAllComments = (storyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/comments`)
    if (res.ok) {
        const comments = await res.json()
        dispatch(allComments(comments))
        return comments
    }
}

// Create a Comment
const createComment = (storyId, data) => async(dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(newComment(comment))
        return comment
    }
}

// Edit a Commment
const updateComment = (commentId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(editComment(comment))
        return comment
    }
}

// Delete a Comment
const deleteComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })
    if (res.ok) {
        dispatch(destroyComment(commentId))
    }
}




const initialState = {
    allComments: {},
    singleComment: {}
}

export const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_COMMENTS:
            const allComments = {...state, allComments: {}}
            action.stories.Stories.forEach(ele => {
                allComments.allComments[ele.id] = ele
            })
            return allComments
        case NEW_COMMENT:
            const newComment = {...state, allComments: {...state.allComments}, singleComment: {}}
            newComment.allComments[action.comment.id] = action.comment
            newComment.singleComment = action.comment
            return newComment
        case EDIT_COMMENT:
            const editedComment = {...state, allComments: {...state.allComments}, singleComment: {...state.singleComment}}
            editedComment.allComments[action.comment.id] = action.comment
            editedComment.singleComment = action.comment
            return editedComment
        case DESTROY_COMMENT:
            const deleteComment = {...state, allComments: {...state.allComments}, singleComment: {}}
            delete deleteComment.allComments[action.commentId]
            return {...deleteComment}


        default:
            return state
    }
}
