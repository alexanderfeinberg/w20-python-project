import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllStories } from '../../store/story';
import './GetAllStories.css';

const GetAllStories = () => {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories.allStories);
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
            <div className="stories_img_wrapper">
              <NavLink key={story.id} to={`/stories/${story.id}`}>
                <div className="stories_title">{story.title}</div>
                <div className="stories_content">{story.content}</div>
                <img 
                    className="stories_img"
                    src={story.image}
                    alt=""
                />
              </NavLink>
          </div>
          )
        })}
    </div>
    )
  );
};

export default GetAllStories;
