
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ModalContext } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import "./index.css";
import homeIcon from "../../assets/home-icon.png"
import logo from "../../assets/main-logo.png"
import logo2 from "../../assets/main-logo-2.png"
import { Redirect } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch()
  const { setModalType } = useContext(ModalContext)
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const goHome = () => {
    window.location.reload(false)
  }

  const logoutButton = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push("/")
    alert("Successfully Logged Out")
  }

  return (
    <div id={user ? "container-1" : "container-1-logged-out"}>
      <div id={user ? "main-icon" : "main-icon-logged-out"}>
        <div id={user ? "img" : "img-logged-out"}>
          <img src={user ? logo2 : logo} onClick={goHome} width="36px" height="36px" />
        </div>
        {!user && (<div onClick={goHome} id="median">Median</div>)}

      </div>

      <div id="navbar-container">
        {!user
          ?
          <div id="navbar-logged-out">
            <div>placeholder</div>
            <div onClick={() => setModalType("Login")}>Sign In</div>
            <div id="get-started" onClick={() => setModalType("Signup")}>Get Started</div>
          </div>
          :
          <div id="navbar">
            <img src={homeIcon} alt="Home Icon" />
            <div>newstory</div>
          </div>
        }
      </div>
      {user && (
      <div>

        <div>profile</div>
        <button onClick={logoutButton}>Log Out</button>
      </div>

      )}
    </div >
  );
}

export default NavBar;
