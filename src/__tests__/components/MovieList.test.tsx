import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MovieList from "../../components/MovieList";

const mockStore = configureStore([]);

describe("MovieList Component", () => {
  test("renders loading spinner when loading", () => {
    const store = mockStore({
      movies: {
        searchResults: [],
        totalResults: 0,
        currentPage: 1,
        loading: true,
        error: null,
        selectedMovie: null,
        searchQuery: "Pokemon",
        searchType: "",
        searchYear: "",
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    const store = mockStore({
      movies: {
        searchResults: [],
        totalResults: 0,
        currentPage: 1,
        loading: false,
        error: "Something went wrong",
        selectedMovie: null,
        searchQuery: "Invalid",
        searchType: "",
        searchYear: "",
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("renders movie list with results", () => {
    const mockMovies = [
      {
        imdbID: "tt1",
        Title: "Test Movie 1",
        Year: "2021",
        Type: "movie",
        Poster: "url1",
      },
      {
        imdbID: "tt2",
        Title: "Test Movie 2",
        Year: "2022",
        Type: "movie",
        Poster: "url2",
      },
    ];

    const store = mockStore({
      movies: {
        searchResults: mockMovies,
        totalResults: 2,
        currentPage: 1,
        loading: false,
        error: null,
        selectedMovie: null,
        searchQuery: "Test",
        searchType: "",
        searchYear: "",
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Found 2 results for "Test"')).toBeInTheDocument();
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });
});
