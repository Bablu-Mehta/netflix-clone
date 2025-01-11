import React, { useEffect, useState } from "react";
import styles from "./Banner.module.scss";

interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string;
  release_date: string;
}

const Banner: React.FC = () => {
  const [bannerMovies, setBannerMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBannerMovies = async () => {
      const response = await fetch("/movies.json");
      const data = await response.json();
      setBannerMovies(data.banner);
    };

    fetchBannerMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMovies.length);
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, [bannerMovies]);

  if (bannerMovies.length === 0) return null;

  const movie = bannerMovies[currentIndex];

  return (
    <div className={styles["banner"]}>
      <img className={styles["banner-image"]} src={movie.poster} alt={movie.name} />
      <div className={styles["banner-content"]}>
        <h1 className={styles["banner-title"]}>{movie.name}</h1>
        <p className={styles["banner-description"]}>{movie.description}</p>
      </div>
    </div>
  );
};

export default Banner;
