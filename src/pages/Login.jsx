import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // console.log(user.user.uid);
        history.push(`/fileview/${user.user.uid}`);
      })
      .catch((error) => {
        setErrorMsg("User either not found or incorrect credentials");
      });
  }
  return (
    <>
      <div className="layout"></div>
      <div className="sign-in">
        <h1>Sign in</h1>
        <p>To access your cloud storage</p>
        <form onSubmit={signIn}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p id="err-msg">{errorMsg}</p>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}
