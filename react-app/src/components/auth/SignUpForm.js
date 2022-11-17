import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./login-signup.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { setModalType } = useContext(ModalContext);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <form id="signup-container" className="modal-content" onSubmit={onSignUp}>
      <div id="signup-title">Sign Up</div>
      <div id="signup-title-b">Enter below to create an account</div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <label>User Name</label>
      <input
        type="text"
        name="username"
        onChange={updateUsername}
        value={username}
      ></input>
      <label>Email</label>
      <input
        type="text"
        name="email"
        onChange={updateEmail}
        value={email}
      ></input>
      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={updatePassword}
        value={password}
      ></input>
      <label>Confirm Password</label>
      <input
        type="password"
        name="repeat_password"
        onChange={updateRepeatPassword}
        value={repeatPassword}
        required={true}
      ></input>
      <button type="submit">Sign Up</button>
      <div>
        <div>Already have an Account?</div>
        <div id="login-redirect-signup" onClick={() => setModalType("Login")}>
          Log In Here
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
