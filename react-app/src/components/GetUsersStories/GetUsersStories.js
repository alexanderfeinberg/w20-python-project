import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllStories } from '../../store/story';
import './GetUsersStories.css';


const GetUsersStories = () => {  
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const stories = useSelector(state => state.story.allStories);
  const storiesArr = Object.values(stories);  
  const usersStories = storiesArr.filter((story) => story.user_id === user.id);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getAllStories())
    .then(() => setIsLoaded(true))
  }, [dispatch]);



return (
    usersStories && (
    <div className="stories_container">
        {usersStories && usersStories.map((story) => {
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

export default GetUsersStories;