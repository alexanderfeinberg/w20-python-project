import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersStories } from "../../../store/story";

import "./MoreArticles.css";

const MoreArticles = ({ userId }) => {
  const dispatch = useDispatch();
  const storiesRaw = useSelector((state) => state.story.allStories);
  const [isLoaded, setIsLoaded] = useState(false);
  const stories = Object.values(storiesRaw);
  useEffect(() => {
    dispatch(getUsersStories(userId)).then(() => setIsLoaded(true));
  }, []);

  if (isLoaded) {
    return (
      <div className="more-articles-content">
        <div className="more-articles-title">
          <h4>More from Medium</h4>
        </div>
        <div className="article-list">
          {stories.map((story, idx) => (
            <li key={idx}>
              <div className="article-item">
                <div className="author">
                  <a href={`/users/${story.author.id}`}>
                    {story.author.firstName} {story.author.lastName}
                  </a>
                </div>
                <div className="title">
                  <a href={`/stories/${story.id}`}>{story.title}</a>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>Loading....</h1>;
  }
};

export default MoreArticles;
