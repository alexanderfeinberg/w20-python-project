import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import GetAllStories from './components/GetAllStories/GetAllStories';
import GetOneStory from './components/GetOneStory/GetOneStory';
import GetUsersStories from './components/GetUsersStories/GetUsersStories';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])
  return (
    <BrowserRouter>
      <NavBar />
      <h1>My Home Page</h1>
    <Switch>
      <Route path='/stories/:storyId'>
        <GetOneStory />
      </Route>
      <Route path='/users/:userId/stories'>
        <GetUsersStories />
      </Route>
      <Route path='/'>
        <GetAllStories />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
