import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getSingleStory } from '../../store/story';
import './GetOneStory.css';

const GetOneStory = () => {
  const dispatch = useDispatch();
  const { storyId } = useParams();
  const user = useSelector((state) => state.session.user)
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
    <div>{story.title}</div>
    <div>{story.content}</div>
    <div>{story.image}</div>
    <div>{comments.length}</div>
    </>
    );

};

export default GetOneStory;