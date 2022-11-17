import "./UserListModal.css";
import FollowListUser from "./FollowListUser";

const UserListModal = ({ followers, following }) => {
  const followData = followers ? followers : following;
  const title = followers ? "Followers" : "Following";

  return (
    <div className="follow-data-content">
      <div id="follow-data-title">{title}</div>
      <ul id="follow-data">
        {followData.map((user, idx) => (
          <FollowListUser user={user} idx={idx} />
        ))}
      </ul>
    </div>
  );
};

export default UserListModal;
