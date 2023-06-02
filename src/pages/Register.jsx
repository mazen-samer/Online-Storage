import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  function signUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // console.log(user);
        // console.log(user.user.uid);
        setDoc(doc(db, "users", user.user.uid), {
          files: [],
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("User already exists");
      });
  }
  return (
    <>
      <div className="layout"></div>
      <div className="sign-up">
        <h1>Register</h1>
        <p>To access our cloud storage service</p>
        <form onSubmit={signUp}>
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
          <button type="submit">Register</button>
          <p id="err-msg">{errorMsg}</p>
        </form>
        <p>
          Already registered? <Link to="/">Login here</Link>
        </p>
      </div>
    </>
  );
}
