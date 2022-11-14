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
    <div>{story.author.firstName} {story.author.lastName}</div>
    <div>{story.title}</div>
    <div>{story.image}</div>
    <div>{story.content}</div>
    <div>{story.likeCount}</div>
    <div>{story.commentCount}</div>

    </>
    );

};

export default GetOneStory;