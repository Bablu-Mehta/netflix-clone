import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Row.module.scss";
import { Movie, Series } from "../../../interfaces"; // Import shared interfaces

interface RowProps {
  title: string; // Title of the row (e.g., "Trending Now")
  categoryId: number; // Category ID to fetch movies/series
}

export interface Category {
  id: number; // Unique ID for the category
  title: string; // Title of the category
  movies?: Movie[]; // Optional, as some categories may only have series
  series?: Series[]; // Optional, as some categories may only have movies
}

const Row: React.FC<RowProps> = ({ title, categoryId }) => {
  const [items, setItems] = useState<(Movie | Series)[]>([]); // Handles both movies and series
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/movies.json"); // Fetch data from movies.json
      const data: { categories: Category[] } = await response.json();

      // Find the category matching the given categoryId
      const category = data.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const combinedItems = [
          ...(category.movies || []), // Add movies if they exist
          ...(category.series || []), // Add series if they exist
        ];
        setItems(combinedItems);
      }
    };

    fetchItems();
  }, [categoryId]);

  // Handle click to navigate to movie/series details
  const handleItemClick = (id: number, isSeries: boolean) => {
    navigate(isSeries ? `/series/${id}` : `/movie/${id}`);
  };

  return (
    <div className={styles["row-container"]}>
      <h2 className={styles["row-title"]}>{title}</h2>
      <div className={styles["row-items"]}>
        {items.map((item) => (
          <img
            key={item.id}
            className={styles["row-item"]}
            src={item.poster}
            alt={item.name}
            onClick={() => handleItemClick(item.id, "episodes" in item)} // Check if it's a series
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
