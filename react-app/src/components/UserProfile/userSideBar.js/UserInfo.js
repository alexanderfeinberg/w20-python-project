import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadFollowings } from "../../../store/user";

const UserInfo = (user) => {
  const followings = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadFollowings(user.id).then(() => setisLoaded(true)));
  }, [user.id]);
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
        <div></div>
      </div>
    </div>
  );
};

export default UserInfo;
