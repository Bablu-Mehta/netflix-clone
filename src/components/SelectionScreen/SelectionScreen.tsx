import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import styles from "./SelectionScreen.module.scss";

const SelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    navigate("/home"); // Navigate to the home screen when a profile is selected
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear auth state
    navigate("/"); // Redirect to the login page after logging out
  };

  return (
    <div className={styles["selection-container"]}>
      {/* Logout Button */}
      <div className={styles["logout-button-container"]}>
        <button onClick={handleLogout} className={styles["logout-button"]}>
          Logout
        </button>
      </div>

      {/* Selection Title */}
      <h1 className={styles["selection-title"]}>Who's Watching?</h1>

      {/* Profile Cards */}
      <div className={styles["profile-list"]}>
        <div className={styles["profile-card"]} onClick={handleProfileClick}>
          <img
            src="https://i.pinimg.com/564x/a8/0f/19/a80f19f4953b1c1d838aa1382538c9e0.jpg"
            alt="Admin Profile"
            className={styles["profile-image"]}
          />
          <p className={styles["profile-name"]}>Admin</p>
        </div>
        <div className={styles["profile-card"]} onClick={handleProfileClick}>
          <img
            src="https://i.pinimg.com/564x/6a/76/4c/6a764cb03201c29197e56ec9f9c256d1.jpg"
            alt="Guest Profile"
            className={styles["profile-image"]}
          />
          <p className={styles["profile-name"]}>Guest</p>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
