
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ModalContext } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import "./index.css"

const NavBar = () => {
  const dispatch = useDispatch()
  const { setModalType } = useContext(ModalContext)
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const logoutButton = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push("/")
    alert("Successfully Logged Out")
  }

  return (
    <div id={user ? "container-1" : "container-1-logged-out"}>
      {/* <div> */}

        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>

        <div>
          {!user
            ?
            <>
              <div onClick={() => setModalType("Login")}>Login</div>
              <div onClick={() => setModalType("Signup")}>Get Started</div>
            </>
            :
            <>
              <div>CURRENTLY LOGGED IN XD</div>
              <div>{`Hello ${user.firstName}`}</div>
              <button onClick={logoutButton}>Log Out</button>
            </>
          }
        </div>
      {/* </div> */}

    </div>
  );
}

export default NavBar;
