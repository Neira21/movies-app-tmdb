//import axios from 'axios'
//import { useEffect } from 'react'
import useTrending from "../hooks/useTrending";

import TrendingCards from "../components/TrendingCards";
import { useEffect, useState } from "react";
import { getMoviesOrSeries } from "../utils/queryMovies";

const Inicio = () => {
  const [moreValoration, setMoreValoration] = useState([]);
  const [isMovie, setIsMovie] = useState(true);

  
  const changeToMovie = () => {
    setIsMovie(true);
  };

  const changeToTv = () => {
    setIsMovie(false);
  };

  useEffect(() => {
    const fetchMoreValoration = async () => {
      try {
        if (isMovie) {
          const movies = await getMoviesOrSeries("/movie/top_rated");
          setMoreValoration(movies.results);
        } else {
          const series = await getMoviesOrSeries("/tv/top_rated");
          setMoreValoration(series.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoreValoration();
  }, [isMovie]);

  const { trendingMovies, trendingTvs } = useTrending();
  return (
    <div style={{ paddingTop: "100px" }}>
      <h1 style={{letterSpacing: "5px"}}>PAGINA PRINCIPAL THE MOVIE DATABASE</h1>
      <p className="center" style={{fontSize: "20px"}}>
        Navegue en esta app para ver las películas o series más populares del
        momento.
      </p>
      <section style={{display: "flex", flexDirection: "column", gap: "20px", padding: "20px"}}>
        <div>
          <h3 style={{fontSize:"1.25rem"}}>Películas en tendencia</h3>
          <TrendingCards trending={trendingMovies} />
        </div>
        {/* linea divisora */}
        <hr style={{margin:"30px 0"}} />
        <div>
          <h3 style={{fontSize:"1.25rem"}}>Series de TV en tendencia</h3>
          <TrendingCards trending={trendingTvs} />
        </div>
      </section>

      <hr style={{margin:"30px 0"}} />

      <section>
        {moreValoration && moreValoration.length > 0 && (
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                Las {isMovie ? "Películas" : "Series de TV"} mejor valoradas
              </h3>
              <div>
                <button
                  className={isMovie ? "seleccionado" : null}
                  onClick={changeToMovie}
                >
                  {" "}
                  Películas
                </button>
                <button
                  className={!isMovie ? "seleccionado" : null}
                  onClick={changeToTv}
                >
                  {" "}
                  Series
                </button>
              </div>
            </div>
            
            <TrendingCards trending={moreValoration} />

            
          </div>
        )}
      </section>
    </div>
  );
};

export default Inicio;
