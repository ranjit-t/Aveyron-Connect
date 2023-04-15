import React, { useState } from "react";
import "./LoginForm.css";
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // setErrorMessage("logged in");
      navigate("/activity-search");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-page">
      <h1 className="form-title">Log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="form-submit-btn">
          Log in
        </button>
      </form>
      {errorMessage && <div className="form-error">{errorMessage}</div>}
      <div
        style={{ cursor: "pointer", marginTop: "40px" }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't Have an Account ? <p>Signup</p>
      </div>
    </div>
  );
};

export default LoginForm;
