import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersStories } from "../../../store/story";

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
      <div>
        <h1>More on Medium</h1>
        <ul>
          {stories.map((story, idx) => (
            <li key={idx}>{story.title}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <h1>Loading....</h1>;
  }
};

export default MoreArticles;
