const UserInfo = (user) => {
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
