import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { addLikeToStory, getSingleStory } from "../../store/story";
import commentIcon from "../../assets/comment-icon.png";
import likeIcon from "../../assets/like-icon.jpeg";
import "./GetOneStory.css";
import { ModalContext2 } from "../../context/Modal2";

const GetOneStory = () => {
  const dispatch = useDispatch();
  const { storyId } = useParams();
  const history = useHistory();
  const {setModalType2} = useContext(ModalContext2)

  const story = useSelector((state) => state.story.singleStory);
  const count = useSelector((state) => state.story.singleStory.likeCount);

  const comments = useSelector((state) => state.comment.allComments);
  const comment = useSelector((state) => state.comment.singleComment);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSingleStory(storyId)).then(() => setIsLoaded(true));
  }, [dispatch, storyId, comment]);

  // useEffect(() => {
  //   dispatch(addLikeToStory(storyId, count)).then(() => setIsLoaded(true));
  // }, [dispatch, storyId, count]);

  const handleLike = () => {
    console.log("HANDLING LIKE");
    dispatch(addLikeToStory(storyId, 1)).then(() =>
      dispatch(getSingleStory(storyId)).then(() => setIsLoaded(true))
    );
  };

  return (
    <>
      <div className="containers">
        <div className="container-2">
          <div className="story-info">
            <div className="story-header">
              <div className="story-author-info">
                {story?.author?.firstName} {story?.author?.lastName}
              </div>
              <div className="story-author-info2">
                {" "}
                {story?.createdAt?.slice(5, 11)}
              </div>
            </div>
            <div className="story-title">{story.title}</div>
            <img
              className="story-image"
              src={
                "https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"
              }
              alt=""
            />
            <div className="story-content">{story.content}</div>
            <div className="story-likes-comments">
              <div className="story-likes">
                <img
                  className="like-icon"
                  onClick={handleLike}
                  src={likeIcon}
                  alt="Like Icon"
                />
                <span className="story-like-counts">{story.likeCount}</span>
              </div>
              <div
                className="story-comments"
                onClick={() => setModalType2("comments")}
              >
                <img
                  className="comment-icon"
                  src={commentIcon}
                  alt="Comment Icon"
                />
                <span className="story-comment-counts">
                  {story.commentCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-3">3rd Section</div>
      </div>
    </>
  );
};

export default GetOneStory;
