import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])
  return (
    <BrowserRouter>
      <div id={user ? "main-container" : "main-container-logged-out"}>
        <div id={user ? "container-1" : "container-1-logged-out"}>
          <NavBar />
        </div>

        {!user && (
          <div>
            <div id="home-upper-logged-out">
              <div id="home-upper-left-logged-out">
                <h1>
                  Stay Curious.
                </h1>
                <p>
                  Discover stories, thinking, and expertise from writers on any topic.
                </p>
                <button>
                  Start reading
                </button>
              </div>
              <div id="home-upper-right-logged-out">
              MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
              </div>
            </div>
            <div id="home-lower-logged-out">
              test
            </div>
          </div>
        )}

        {user && (
          <>
            <div id={user ? "container-2" : "container-2-logged-out"} className="border">
              <div className="text-center">
                Placeholder
              </div>
              <div className="text-center">
                Placeholder2
              </div>
            </div>

            <div id={user ? "container-3" : "container-3-logged-out"}>3rd Section</div>
          </>

        )}
      </div>

    </BrowserRouter>
  );
}

export default App;
