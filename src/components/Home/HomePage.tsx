import React from "react";
import styles from "./HomePage.module.scss";
import Row from "../Row/Row";
import Banner from "../Banner/Banner";

const HomePage: React.FC = () => {
  return (
    <div className={styles["home-container"]}>
      <header className={styles["header"]}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className={styles["logo"]}
        />
        <button className={styles["profile-button"]}>Profile</button>
      </header>
      <Banner />
      <main className={styles["content"]}>
        <Row title="Trending Now" categoryId={1} />
        <Row title="Top Rated" categoryId={2} />
        <Row title="Action Movies" categoryId={3} />
      </main>
    </div>
  );
};

export default HomePage;
