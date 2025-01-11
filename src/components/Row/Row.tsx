import React, { useEffect, useState } from "react";
import styles from "./Row.module.scss";

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

interface RowProps {
  title: string;
  categoryId: number;
}

const Row: React.FC<RowProps> = ({ title, categoryId }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/movies.json");
      const data: { categories: Category[] } = await response.json();

      // Find the category by ID
      const category = data.categories.find((cat) => cat.id === categoryId);

      if (category) {
        setMovies(category.movies);
      }
    };

    fetchMovies();
  }, [categoryId]);

  return (
    <div className={styles["row-container"]}>
      <h2 className={styles["row-title"]}>{title}</h2>
      <div className={styles["row-items"]}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={styles["row-item"]}
            src={movie.poster}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
