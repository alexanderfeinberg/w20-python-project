import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadFollowings } from "../../../store/user";

const UserInfo = ({ user }) => {
  const followings = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const [isLoaded, setisLoaded] = useState(false);

  console.log("FOLLOWINGS ", followings);

  useEffect(() => {
    dispatch(loadFollowings(user.id, "1", "5")).then(() => setisLoaded(true));
  }, [user.id]);

  if (isLoaded) {
    return (
      <div>
        <div>
          <img src={user.profile_picture} />
        </div>
        <div>{user.followerCount} Followers</div>
        <div>{user.bio}</div>
        <div>
          <button>Follow</button>
        </div>
        <div>
          <h3>Following</h3>
          <div>
            <ul>
              {Object.values(followings).map((following, idx) => {
                return (
                  <li key={idx}>
                    {following.firstName} {following.lastName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default UserInfo;
