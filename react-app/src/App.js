import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import GetAllStories from './components/GetAllStories/GetAllStories';
import GetOneStory from './components/GetOneStory/GetOneStory';

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
      <Route path='/'>
        <GetAllStories />
      </Route>
      <Route path='/stories/:storyId'>
        <GetOneStory />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
