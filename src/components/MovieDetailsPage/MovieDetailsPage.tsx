import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MovieDetailsPage.module.scss";

interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string;
  release_date: string;
}

interface Category {
  id: number;
  title: string;
  movies: Movie[];
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch("/movies.json");
        const data: { categories: Category[] } = await response.json();

        const allMovies = data.categories.flatMap((category) => category.movies || []);
        const foundMovie = allMovies.find((m) => m.id === Number(id));

        if (foundMovie) {
          setMovie(foundMovie);

          const suggestions = allMovies.filter((m) => m.id !== Number(id)).slice(0, 6);
          setSuggestedMovies(suggestions);
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        navigate("/home");
      }
    };

    fetchMovieDetails();
  }, [id, navigate]);

  if (!movie) return null;

  return (
    <div className={styles["details-container"]}>
      {/* Movie Details */}
      <img src={movie.poster} alt={movie.name} className={styles["details-poster"]} />
      <div className={styles["details-content"]}>
        <h1>{movie.name}</h1>
        <p>{movie.description}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <div className={styles["details-buttons"]}>
          <button className={styles["play-button"]}>Play</button>
          <button className={styles["download-button"]}>Download</button>
        </div>
      </div>

      {/* Suggested Movies */}
      <div className={styles["suggested-container"]}>
        <h2>More Like This</h2>
        <div className={styles["suggested-movies"]}>
          {suggestedMovies.length > 0 ? (
            suggestedMovies.map((suggestion) => (
              <div
                key={suggestion.id}
                className={styles["suggested-movie"]}
                onClick={() => navigate(`/movie/${suggestion.id}`)}
              >
                <img src={suggestion.poster} alt={suggestion.name} />
                <p>{suggestion.name}</p>
              </div>
            ))
          ) : (
            <p>No similar movies available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
