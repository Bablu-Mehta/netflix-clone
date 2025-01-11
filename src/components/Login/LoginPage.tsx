import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Redirect to /select if already logged in
  if (isAuthenticated) {
    navigate("/select");
  }

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-header"]}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
          className={styles["login-logo"]}
        />
      </div>
      <div className={styles["login-form"]}>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["login-input"]}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["login-input"]}
          />
          <button type="submit" className={styles["login-button"]}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
