import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.scss";

interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string; // Add description to the Movie interface
  isSeries?: boolean; // Optional flag to determine if the item is a series
}

const Banner: React.FC = () => {
  const [bannerMovies, setBannerMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch the movies for the banner
  useEffect(() => {
    const fetchBannerMovies = async () => {
      const response = await fetch("/movies.json"); // Fetch the movie data
      const data = await response.json();
      setBannerMovies(data.banner); // Assuming the `banner` array exists in the JSON
    };

    fetchBannerMovies();
  }, []);

  // Change the current banner movie every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMovies.length);
    }, 3000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [bannerMovies]);

  if (bannerMovies.length === 0) return null; // Avoid rendering if no banner movies exist

  const movie = bannerMovies[currentIndex];

  const handleBannerClick = () => {
    navigate(movie.isSeries ? `/series/${movie.id}` : `/movie/${movie.id}`);
  };

  return (
    <div className={styles["banner"]} onClick={handleBannerClick}>
      <img className={styles["banner-image"]} src={movie.poster} alt={movie.name} />
      <div className={styles["banner-content"]}>
        <h1 className={styles["banner-title"]}>{movie.name}</h1>
        <p className={styles["banner-description"]}>{movie.description}</p> {/* Added description */}
      </div>
    </div>
  );
};

export default Banner;
