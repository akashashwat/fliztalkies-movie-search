import { useState } from "react";

import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { NavBar } from "./Components/Navbar";
import { Logo } from "./Components/Logo";
import { Search } from "./Components/Search";
import { NumResults } from "./Components/NumResults";
import { ErrorMessage } from "./Components/ErrorMessage";
import { Main } from "./Components/Main";
import { Box } from "./Components/Box";
import { Loader } from "./Components/Loader";
import { MovieList } from "./Components/MovieList";
import { MovieDetails } from "./Components/MovieDetails";
import { WatchedSummary } from "./Components/WatchedSummary";
import { WatchedMovieList } from "./Components/WatchedMovieList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, isLoading, error] = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
