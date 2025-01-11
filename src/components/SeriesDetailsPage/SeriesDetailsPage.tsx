import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./SeriesDetailsPage.module.scss";

interface Episode {
  id: number;
  title: string;
  description: string;
  runtime: string;
}

interface Series {
  id: number;
  name: string;
  poster: string;
  description: string;
  release_date: string;
  episodes: Episode[];
}

interface Category {
  id: number;
  title: string;
  series?: Series[];
}

interface MoviesData {
  categories: Category[];
}

const SeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [series, setSeries] = useState<Series | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      const response = await fetch("/movies.json");
      const data: MoviesData = await response.json();

      const seriesCategory = data.categories.find(
        (category) => category.series
      );

      const foundSeries = seriesCategory?.series?.find((s) => s.id === Number(id));

      if (foundSeries) {
        setSeries(foundSeries);
      } else {
        navigate("/home");
      }
    };

    fetchSeriesDetails();
  }, [id, navigate]);

  if (!series) return null;

  return (
    <div className={styles["details-container"]}>
      <img src={series.poster} alt={series.name} className={styles["details-poster"]} />
      <div className={styles["details-content"]}>
        <h1>{series.name}</h1>
        <p>{series.description}</p>
        <p>
          <strong>Release Date:</strong> {series.release_date}
        </p>
        <h2>Episodes</h2>
        <div className={styles["episodes-list"]}>
          {series.episodes.map((episode) => (
            <div key={episode.id} className={styles["episode"]}>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
              <p>
                <strong>Runtime:</strong> {episode.runtime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
