import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])
  return (
    <BrowserRouter>
      <NavBar />
      <h1>My Home Page</h1>

    </BrowserRouter>
  );
}

export default App;
