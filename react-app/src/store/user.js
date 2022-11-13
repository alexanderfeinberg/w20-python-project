import { csrfFetch } from "./csrf";

const LOAD_USER = "/users/LOAD_USER";
const LOAD_CURRENT_USER = "/users/LOAD_CURRENT_USER";
const LOAD_USER_LIST = "/users/LOAD_USER_LIST";
const FOLLOW_USER = "/users/FOLLOW_USER";
const UNFOLLOW_USER = "/users/UNFOLLOW_USER";

initialState = {
  singleUser: {},
  userList: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
