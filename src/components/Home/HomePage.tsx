import React, { useState } from "react";
import Row from "../Row/Row";
import Banner from "../Banner/Banner";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const profileData = {
    name: "Admin", // Replace with actual data if available
    email: "admin@gmail.com",
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className={styles["home-container"]}>
      {/* Header Section */}
      <header className={styles["header"]}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className={styles["logo"]}
        />
        <button className={styles["profile-button"]} onClick={toggleDrawer}>
          Profile
        </button>
      </header>

      {/* Banner Section */}
      <Banner />

      {/* Rows Section */}
      <main className={styles["content"]}>
        <Row title="Trending Now" categoryId={1} />
        {/* <Row title="Top Rated" categoryId={2} /> */}
        {/* <Row title="Action Movies" categoryId={3} /> */}
        <Row title="Popular Series" categoryId={5} /> {/* Add Series Row */}
      </main>

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        profileData={profileData}
      />
    </div>
  );
};

export default HomePage;
