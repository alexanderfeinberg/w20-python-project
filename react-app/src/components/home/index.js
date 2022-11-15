import NavBar from "../NavBar"
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from "../../context/Modal"
import { authenticate } from "../../store/session";
import { getAllStories as getAllStoriesThunk } from "../../store/story";
import "./index.css"
import GetAllStories from "../GetAllStories/GetAllStories";

const Home = () => {
    const dispatch = useDispatch();
    const {setModalType} = useContext(ModalContext)
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(authenticate())
        dispatch(getAllStoriesThunk())
      }, [dispatch])
    const stories = useSelector(state => state.story.allStories)


    return (
        <div id={user ? "main-container" : "main-container-logged-out"}>
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
                            <button onClick={() => setModalType("Signup")}>
                                Start reading
                            </button>
                        </div>
                        <div id="home-upper-right-logged-out">
                            MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
                        </div>
                    </div>
                    <div id="home-lower-logged-out">
                        <div id="home-lower-logged-out-inner">
                            <GetAllStories stories={stories} />
                        </div>
                    </div>
                </div>
            )}

            {user && (
                <>
                    <div id="container-2" className="border">
                        <div className="text-center">
                            <GetAllStories stories={stories} />
                        </div>
                        <div className="text-center">
                            Placeholder2
                        </div>
                    </div>

                    <div id={user ? "container-3" : "container-3-logged-out"}>3rd Section</div>
                </>

            )}
        </div>

    )
}

export default Home
