import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteStory } from "../../store/story";
import { getUser } from "../../store/user";
import './GetAllStories.css';
import profileIcon from "../../assets/profile-icon.jpeg";
const GetAllStories = ({stories}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { storyId } = useParams();

  const user = useSelector((state) => state.session.user);
  const storiesArr = Object.values(stories);

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);

  if (Object.keys(storiesArr).length === 0) {
    return null;
  }

  const deleteStoryHandler = (storyId) => {
    dispatch(deleteStory(storyId));
    history.push("/");
  };


  return (
    storiesArr && (
    <div className="stories-container">
        {storiesArr && storiesArr.map((story) => {
          return (
            <>
            <div className="stories-author-info"
              onClick={() => history.push(`/users/${story.author.id}`)}>
              {/* {story.author.profile_picture}  */}
              <img className="profile-icon" src={profileIcon} alt="Profile Icon"/>{story.author.firstName} {story.author.lastName} · {story.createdAt.slice(5, 11)}
            </div>
            <div className="stories-container2">
                <div className="stories-info">
                  <NavLink key={story.id} to={`/stories/${story.id}`}>
                    <div className="stories-title">{story.title}</div>
                    <div className="stories-content">{story.content}</div>
                  </NavLink>
                    <div className="stories-buttons">
                        {user.id === story.user_id &&
                          <button className="edit-story-button"
                            onClick={() => history.push(`/story/${story.id}/edit`)}>
                            Edit story
                          </button>}
                        {user.id === story.user_id &&
                          (<button className="delete-story-button"
                            onClick={() => deleteStoryHandler(story.id)}>
                            Delete story
                          </button>)}
                    </div>
                </div>

                  <NavLink key={story.id} to={`/stories/${story.id}`}>
                  <div className="stories-image-container">
                    <img
                        className="stories-image"
                        src={"https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"}
                        alt=""
                    />
                  </div>
                  </NavLink>
                </div>
              <div className="stories-divider"></div>
            </>
          )
        })}
    </div>
    )
  );
};

export default GetAllStories;
