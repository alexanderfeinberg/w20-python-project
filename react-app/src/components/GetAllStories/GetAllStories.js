import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllStories } from '../../store/story';
import './GetAllStories.css';

const GetAllStories = () => {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.story.allStories);
  const storiesArr = Object.values(stories);

  useEffect(() => {
    dispatch(getAllStories())
  }, [dispatch]);

   if (Object.keys(storiesArr).length === 0) {
    return null;
  }

  return (
    storiesArr && (
    <div className="stories_container">
        {storiesArr && storiesArr.map((story) => {
          return (
            <>
            <div className="stories_author">{story.author.firstName} {story.author.lastName}</div>
            {/* <NavLink key={story.author.id} to={`/users/${userId}`}></NavLink> */}
            <div className="stories_wrapper">
              <NavLink key={story.id} to={`/stories/${story.id}`}>
                <div className="stories_container_left">
                    <div className="stories_title">{story.title}</div>
                    <div className="stories_content">{story.content}</div>
                </div>
                <div className="stories_container_right">
                    <div className="stories_image">{story.image}</div>
                </div>
                {/* <img 
                    className="stories_img"
                    src={story.image}
                    alt=""
                /> */}
              </NavLink>
          </div>
          </>
          )
        })}
    </div>
    )
  );
};

export default GetAllStories;
