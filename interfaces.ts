export interface Episode {
  id: number;
  title: string;
  description: string;
  runtime: string;
}

export interface Series {
  id: number;
  name: string;
  poster: string;
  description: string;
  release_date: string;
  episodes: Episode[];
}

export interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string;
  release_date: string;
}

export interface Category {
  id: number;
  title: string;
  movies?: Movie[]; // Optional, as some categories may only have series
  series?: Series[]; // Optional, as some categories may only have movies
}

export interface MoviesData {
  categories: Category[];
  banner: Movie[];
}
