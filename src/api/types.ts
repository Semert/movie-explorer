export interface SearchParams {
  s: string;
  type?: "movie" | "series" | "episode";
  y?: string;
  page: number;
}

export interface MovieSearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetailResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string;
}

interface Rating {
  Source: string;
  Value: string;
}
