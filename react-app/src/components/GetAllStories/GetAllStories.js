import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getAllStories } from '../../store/story';
import { getUser, getUserList } from "../../store/user";
import './GetAllStories.css';

const GetAllStories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId }  = useParams();

  const stories = useSelector(state => state.story.allStories);
  const storiesArr = Object.values(stories);

  const user = useSelector(state => state.user.singleUser)

  useEffect(() => {
    dispatch(getAllStories())
  }, [dispatch]);
 
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);

   if (Object.keys(storiesArr).length === 0) {
    return null;
  }

  return (
    storiesArr && (
    <div className="stories-container">
        {storiesArr && storiesArr.map((story) => {
          return (
            <div className="stories-container2">
                <div className="stories-author-info">{story.author.profile_picture} {story.author.firstName} {story.author.lastName} · {story.createdAt.slice(5, 11)}
                  {/* <NavLink key={user.id} to={`/users/${user.id}`}></NavLink> */}
                  {/* <NavLink onClick={() => history.push(`/users/${user.id}`)}></NavLink> */}
                </div>
                <div className="stories-info">
                  <NavLink key={story.id} to={`/stories/${story.id}`}>

                  <div className="stories-container-left">
                      <div className="stories_title">{story.title}</div>
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
          </div>
          )
        })}
    </div>
    )
  );
};

export default GetAllStories;
