import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Row.module.scss";
import { Movie, Series } from "../../../interfaces";

interface RowProps {
  title: string;
  categoryId: number;
}

export interface Category {
  id: number;
  title: string;
  movies?: Movie[];
  series?: Series[];
}

const Row: React.FC<RowProps> = ({ title, categoryId }) => {
  const [items, setItems] = useState<(Movie | Series)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/movies.json");
      const data: { categories: Category[] } = await response.json();

      const category = data.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const combinedItems = [
          ...(category.movies || []), 
          ...(category.series || []), 
        ];
        setItems(combinedItems);
      }
    };

    fetchItems();
  }, [categoryId]);

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
            onClick={() => handleItemClick(item.id, "episodes" in item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
