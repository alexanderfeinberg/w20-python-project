import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getSingleStory } from '../../store/story';
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
        <div className="story-author">{story.author.firstName} {story.author.lastName}</div>
        <div className="story_title">{story.title}</div>
        <img 
            className="story-image"
            src={"https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"}
            alt=""
        />        
        <div className="story-content">{story.content}</div>
        <div className="story-likes">{story.likeCount}</div>
        <div className="story-comments">{story.commentCount}</div>
      </div>
      <div className="container-3">3rd Section</div>
    </div>
  </>
  );
};

export default GetOneStory;