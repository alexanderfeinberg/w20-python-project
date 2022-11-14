import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import { authenticate } from "./store/session";
import "./App.css";

import Home from "./components/home";
import GetOneStory from "./components/GetOneStory/GetOneStory";
import Profile from "./components/UserProfile/profile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory()
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  return (
    <div id={user ? "app-container" : "app-container-logged-out"}>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Home />
        </Route>
        <Route path="/stories/:storyId">
          <NavBar />
          <GetOneStory />
        </Route>
        <Route path="/users/:userId">
          <NavBar />
          <Profile />
        </Route>
        <Route path="/story/new">
          <h1 onClick={() => history.push("/")}>create story route test</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
