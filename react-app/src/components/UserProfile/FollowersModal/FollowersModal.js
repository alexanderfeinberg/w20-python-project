import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserfollowers } from "../../../store/user";

const FollowersModal = () => {
  dispatch = useDispatch();
  followers = useSelector((state) => state.user.userList);

  useEffect((getUserfollowers) => {
    dispatch();
  }, []);
};
