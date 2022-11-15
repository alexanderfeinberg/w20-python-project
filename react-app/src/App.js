import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import { authenticate } from "./store/session";
import "./App.css";

import Home from "./components/home";
import GetOneStory from "./components/GetOneStory/GetOneStory";
import Profile from "./components/UserProfile/profile";
import CreateCommentForm from "./components/CreateCommentModal/CreateCommentForm";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  return (
    <div id={user ? "app-container" : "app-container-logged-out"}>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/stories/:storyId">
          <GetOneStory />
        </Route>
        <Route path="/users/:userId">
          <Profile />
        </Route>
        <Route path="/createComment/:storyId">
          <CreateCommentForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
