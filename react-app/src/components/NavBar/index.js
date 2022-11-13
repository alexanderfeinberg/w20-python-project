
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ModalContext } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const NavBar = () => {
  const dispatch = useDispatch()
  const { setModalType } = useContext(ModalContext)
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  // useEffect(() => {
  //   console.log(sessionUser)
  // }, [sessionUser])


  const logoutButton = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push("/")
    alert("Successfully Logged Out")
  }

  return (
    <nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>

      <div>
        {!sessionUser
          ?
          <>
            <div onClick={() => setModalType("Login")}>Login</div>
            <div onClick={() => setModalType("Signup")}>Get Started</div>
          </>
          :
          <>
            <div>CURRENTLY LOGGED IN XD</div>
            <div>{`Hello ${sessionUser.firstName}`}</div>
            <button onClick={logoutButton}>Log Out</button>
          </>
        }
      </div>

    </nav>
  );
}

export default NavBar;
