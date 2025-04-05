import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieItem from "../../components/MovieList/MovieItem";

const mockMovie = {
  imdbID: "tt0123456",
  Title: "Test Movie",
  Year: "2021",
  Type: "movie",
  Poster: "https://example.com/poster.jpg",
};

const mockMovieWithoutPoster = {
  imdbID: "tt7890123",
  Title: "No Poster Movie",
  Year: "2022",
  Type: "series",
  Poster: "N/A",
};

describe("MovieItem Component", () => {
  test("renders movie details correctly", () => {
    render(
      <MemoryRouter>
        <MovieItem movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Movie")).toBeInTheDocument();
    expect(screen.getByText("IMDb: tt0123456")).toBeInTheDocument();

    const image = screen.getByAltText("Test Movie");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toBe("https://example.com/poster.jpg");
  });

  test("renders placeholder when poster is not available", () => {
    render(
      <MemoryRouter>
        <MovieItem movie={mockMovieWithoutPoster} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("No Poster Movie", { selector: "p" })
    ).toBeInTheDocument();
  });

  test("links to correct movie detail page", () => {
    render(
      <MemoryRouter>
        <MovieItem movie={mockMovie} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/movie/tt0123456");
  });
});
