import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getUsersStories } from '../../store/story';
import './GetUsersStories.css';


const GetUsersStories = () => {  
  const dispatch = useDispatch();
  const { userId } = useParams();

  const user = useSelector((state) => state.session.user);
  const stories = useSelector(state => state.story.allStories);
  const storiesArr = Object.values(stories);  
  const usersStories = storiesArr.filter((story) => story.user_id === user.id);
  console.log("stories-----", stories)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getUsersStories(userId))
    .then(() => setIsLoaded(true))
  }, [dispatch, userId]);



return (
    usersStories && (
    <div className="stories-container">
        {usersStories && usersStories.map((story) => {
          return (
            <>
            <div className="stories-author-info">{story.author.firstName} {story.author.lastName}</div>
            {/* <NavLink key={story.author.id} to={`/users/${userId}`}></NavLink> */}
            <div className="stories-wrapper">
              <NavLink key={story.id} to={`/stories/${story.id}`}>
                <div className="stories_container_left">
                    <div className="stories-title">{story.title}</div>
                    <div className="stories-content">{story.content}</div>
                </div>
                <div className="stories-container-right">
                    <div className="stories-image">{story.image}</div>
                </div>
                {/* <img 
                    className="stories-img"
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