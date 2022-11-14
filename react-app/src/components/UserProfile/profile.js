import React, { useEffect, useContext, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from react-router-dom;
import { getUser } from "../../store/user";
import { storyReducer } from "../../store/story";

const Profile = () =>{
    const dispatch = useDispatch();
    const { userId } = useParams();

    const user = useSelector((state)=> state.user.singleUser);
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=>{
        dispatch(getUser(userId)).then(()=>setIsLoaded(true))
    })

    if(isLoaded) {
        return <div>
            <div>
            <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <div>
                "Home"
            </div>
            <div>
                {user.Stories && <ul>{user.Stories.map((story, idx)=>{return <li key={idx}>{story.title}</li>})}</ul>}
            </div>
        </div>
    }
    return <div>
        <h1>
            "Loading..."
        </h1>
    </div>
}
