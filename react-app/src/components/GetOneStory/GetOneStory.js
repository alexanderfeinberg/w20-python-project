import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getSingleStory } from '../../store/story';
import commentIcon from "../../assets/comment-icon.png";
import likeIcon from "../../assets/like-icon.jpeg";
import './GetOneStory.css';

const GetOneStory = () => {
  const dispatch = useDispatch();
  const { storyId } = useParams();
  const story = useSelector(state => state.story.singleStory);

  const comments = useSelector(state => state.comment.allComments);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getSingleStory(storyId))
    .then(() => setIsLoaded(true))
  }, [dispatch, storyId]);
  
  if (Object.keys(story).length === 0) {
    return null;
  }

  return (
    <>
    <div className="containers">
      <div className="container-2">
        <div className="story-info">
        <div className="story-header">
          <div className="story-author-info">{story.author.firstName} {story.author.lastName}</div>
          <div className="story-author-info2"> {story.createdAt.slice(5, 11)}</div>
        </div>
        <div className="story-title">{story.title}</div>
        <img 
            className="story-image"
            src={"https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"}
            alt=""
        />        
        <div className="story-content">{story.content}</div>
        <div className="story-likes-comment">
          <img className="like-icon" src={likeIcon} alt="Like Icon"/> 
            <span className="story-likes">{story.likeCount}</span>
          <img className="comment-icon" src={commentIcon} alt="Comment Icon" /> {story.commentCount}      
        </div>
        </div>
      </div>
      <div className="container-3">3rd Section</div>
    </div>
  </>
  );
};

export default GetOneStory;