import { useState } from "react";
import { getMoviesOrSeries } from "../utils/queryMovies";
// hook para buscar películas o series de TV
// Si no se pasa un valor de búsqueda, se obtienen todas las películas o series de TV mediante DISCOVER

const useSearchMovie = (trendmovie, genre) => {
  const [data, setData] = useState({
    info: [],
    loading: true,
    error: null,
  });

  const [search, setSearch] = useState();
  const [page, setPage] = useState(1); // Agregar el estado de paginación
  const [hasMore, setHasMore] = useState(true); // Agregar el estado para saber si hay más resultados

  const fecthMovie = async (search, isMovie, page = 1) => {
    if (page === 1) {
      setData({
        info: [],
        loading: true,
        error: null,
      });
    } else {
      setData((prevMovies) => ({
        ...prevMovies,
        loading: true,
      }));
    }

    try {
      const type = search ? "search" : "discover";
      const movieOrTv = isMovie ? "movie" : "tv";

      let data;

      if (trendmovie !== undefined && (!search || search.length === 0)) {
        // trendmovie tiene un valor true o false
        data = isMovie
          ? await getMoviesOrSeries(`trending/movie/day?page=${page}`)
          : await getMoviesOrSeries(`trending/tv/day?page=${page}`);
      } else if (genre && (!search || search.length === 0)) {
        data = await getMoviesOrSeries(
          `${type}/${movieOrTv}?with_genres=${genre}&page=${page}`
        );
      } else {
        data =
          search && search.length > 0
            ? await getMoviesOrSeries(
                `${type}/${movieOrTv}?query=${search}&page=${page}`
              )
            : await getMoviesOrSeries(`${type}/${movieOrTv}?page=${page}`);
      }
      setData((prevMovies) => ({
        info:
          page === 1 ? data.results : [...prevMovies.info, ...data.results],
        loading: false,
        error: null,
      }));

      if (data.results.length === 0) {
        setHasMore(false); // Si ya no hay más resultados
      }
    } catch (error) {
      setData({
        info: [],
        loading: false,
        error: error,
      });
      setHasMore(false);
    }
  };

  return {
    data,
    search,
    setSearch,
    fecthMovie,
    hasMore, // Retornar el estado de hasMore
    page,
    setPage, // Retornar también el estado de página
  };
};

export default useSearchMovie;
