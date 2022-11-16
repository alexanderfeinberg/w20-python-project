import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="card-header">
        <h2>
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <div className="card-content">{user.bio}</div>
      <div className="card-footer">
        <div className="card-follower-count">{user.followerCount}</div>
        <div className="btn">
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
