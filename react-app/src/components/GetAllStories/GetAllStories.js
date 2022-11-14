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
    <div className="stories-container">
        {storiesArr && storiesArr.map((story) => {
          return (
            <>
            <div className="stories-author">{story.author.firstName} {story.author.lastName}</div>
            {/* <NavLink key={story.author.id} to={`/users/${userId}`}></NavLink> */}
            <div className="stories-wrapper">
              <NavLink key={story.id} to={`/stories/${story.id}`}>
                <div className="stories-container-left">
                    <div className="stories_-title">{story.title}</div>
                    <div className="stories-content">{story.content}</div>
                </div>
                
                <div className="stories-container-right">
                  <img 
                      className="stories-image"
                      src={"https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"}
                      alt=""
                  />
                </div>
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
