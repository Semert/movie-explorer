import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "../../components/MovieList/SearchBar";
import { setSearchQuery, searchMovies } from "../../redux/actions/movieActions";

// Mock the actions
jest.mock("../../redux/actions/movieActions", () => ({
  setSearchQuery: jest.fn(() => ({ type: "SET_SEARCH_QUERY" })),
  searchMovies: jest.fn(() => ({ type: "SEARCH_MOVIES" })),
}));

const mockStore = configureStore([]);

describe("SearchBar Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      movies: {
        searchQuery: "Pokemon",
      },
    });
    store.dispatch = jest.fn();
  });

  test("renders with initial value from store", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search for movies/i);
    expect(input).toHaveValue("Pokemon");
  });

  test("dispatches actions when user types", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search for movies/i);
    fireEvent.change(input, { target: { value: "Star Wars" } });

    // Wait for debounce
    await waitFor(
      () => {
        expect(setSearchQuery).toHaveBeenCalledWith("Star Wars");
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(searchMovies).toHaveBeenCalled();
      },
      { timeout: 600 }
    );
  });
});
