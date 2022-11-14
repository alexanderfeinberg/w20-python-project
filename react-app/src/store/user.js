import { csrfFetch } from "./csrf";

const LOAD_USER = "/users/LOAD_USER";
const LOAD_CURRENT_USER = "/users/LOAD_CURRENT_USER";
const LOAD_USER_LIST = "/users/LOAD_USER_LIST";
const FOLLOW_USER = "/users/FOLLOW_USER";
const UNFOLLOW_USER = "/users/UNFOLLOW_USER";
const LOAD_USER_FOLLOWERS = "/users/LOAD_USER_FOLLOWERS";

//actions
const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user,
  };
};

const loadCurrentUser = (user) => {
  return {
    type: LOAD_CURRENT_USER,
    user,
  };
};

const loadUserList = (users) => {
  return {
    type: LOAD_USER_LIST,
    users,
  };
};

const loadUserFollowers = (followers) => {
  return {
    type: LOAD_USER_FOLLOWERS,
    followers,
  };
};

const followUser = (userToFollow) => {
  return {
    type: FOLLOW_USER,
    userToFollow,
  };
};

export const getUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await (await res).json();
    dispatch(loadUser(user));
    return user;
  }
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch(`api/users/profile`);
  if (res.ok) {
    const user = await res.json();
    dispatch(loadCurrentUser(user));
    return user;
  }
};

export const getUserList = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users`);
  if (res.ok) {
    const users = await res.json();
    dispatch(loadUserList(users));
    return users;
  }
};

export const getUserfollowers = (userId) => async (dispatch) => {
  const resp = await csrfFetch(`/api/users/${userId}/followers`);
  if (resp.ok) {
    const followers = await resp.json();
    dispatch(loadUserFollowers(followers));
    return followers;
  }
};

export const followThunk = (userFollowedId) => async (dispatch) => {
  const resp = await csrfFetch(`/api/users/${userFollowedId}/followers`, {
    method: "POST",
  });
  if (resp.ok) {
    return;
  }
};

export const unfollowThunk = (userUnfollowedId) => async (dispatch) => {
  const resp = await csrfFetch(`/api/users/${userUnfollowedId}/followers`, {
    method: "DELETE",
  });
  if (resp.ok) {
    return;
  }
};

let initialState = {
  singleUser: {},
  userList: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      const userState = { ...state, singleUser: { ...action.user } };
      return userState;
    case LOAD_CURRENT_USER:
      const currentUserState = { ...state, singleUser: { ...action.user } };
      return currentUserState;
    case LOAD_USER_LIST:
      const userListState = { ...state, userList: { ...action.users } };
    case LOAD_USER_FOLLOWERS:
      const userFollowerState = { ...state, userList: { ...action.followers } };
      return userFollowerState;
    default:
      return state;
  }
};
