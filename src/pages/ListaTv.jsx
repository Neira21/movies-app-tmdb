import { useEffect, useCallback } from "react";
import debounce from "just-debounce-it";
import PeliculaFormulario from "../components/PeliculaFormulario";
import useSearchMovie from "../hooks/useSearchMovie";
import { useLocation } from "react-router-dom";

import useCategories from "../hooks/useCategories";
import CategoriaContenedor from "../components/CategoriaContenedor";
import ListaContenedor from "../components/ListaContenedor";

const ListaPelicula = () => {
  const { categoriesTvs } = useCategories();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const isMovieParam = params.get("ismovie");
  const isMovie = false;

  const genre = params.get("genre");
  const trendmovie =
    isMovieParam === "movietrend"
      ? true
      : isMovieParam === "tvtrend"
      ? false
      : undefined;

  const { data, search, setSearch, fecthMovie, page, setPage } =
    useSearchMovie(trendmovie, genre);

  // Crear la función debounced usando useCallback para memorizarla.
  const debouncedSearch = useCallback(
    debounce(() => {
      fecthMovie(search, isMovie, 1);
    }, 400), // Espera 400 ms antes de hacer la búsqueda
    [search, isMovie] // Solo se recrea si search o isMovie cambian
  );

  useEffect(() => {
    debouncedSearch();
    // Cleanup: cancelar cualquier búsqueda pendiente si el componente se desmonta
    return () => {
      debouncedSearch.cancel(); // Cancela la búsqueda si se sigue tipeando
    };
  }, [debouncedSearch, search]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); // Incrementar la página
    fecthMovie(search, isMovie, page + 1); // Cargar más películas o series
  };

  // useEffect que escucha los cambios en location.search (parámetros de la URL)
  useEffect(() => {
    // Realiza la búsqueda cuando cambian los parámetros
    fecthMovie(search, isMovie, 1);
  }, [location.search]); // Se ejecuta cuando cambia location.search

  return (
    <div className="container" style={{paddingTop: "100px"}}>
      <div className="container-categories">
        <h1>Géneros</h1>
        <CategoriaContenedor category={categoriesTvs} isMovie={isMovie} />
      </div>
      <div className="container-list">
        <PeliculaFormulario setSearch={setSearch} />
        <ListaContenedor isMovie={isMovie} data={data} />
        <div>
          <button 
          onClick={loadMoreMovies}
          style={{
            margin: 'auto',
            marginTop:'20px',
            padding: '20px',
            display: 'block',
          }}>Cargar más</button>

        </div>
        
      </div>
    </div>
    
  );
};

export default ListaPelicula;
