import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.scss";

interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string;
  isSeries?: boolean; // Flag to determine if the item is a series
}

const Banner: React.FC = () => {
  const [bannerMovies, setBannerMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBannerMovies = async () => {
      const response = await fetch("/movies.json"); // Adjust this to your API endpoint
      const data = await response.json();
      setBannerMovies(data.banner);
    };

    fetchBannerMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMovies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerMovies]);

  if (bannerMovies.length === 0) return null;

  const movie = bannerMovies[currentIndex];

  const handleBannerClick = () => {
    if (movie.isSeries) {
      navigate(`/series/${movie.id}`);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    // <div className={styles["banner"]} onClick={handleBannerClick}>
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
