import Loading from "./Loading";
import PropTypes from "prop-types";
import style from "./PeliculaDetalle.module.css";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const Detalle = ({ data, loading, tipo, trailer, similar }) => {
  Detalle.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    tipo: PropTypes.string,
    trailer: PropTypes.string,
    similar: PropTypes.array,
  };

  const [modalShow, setModalShow] = useState(false);

  const handleModal = () => {
    setModalShow(!modalShow);
  }

  return (
    <div>
      {loading ? (
        <div className="center" style={{ paddingTop: "100px" }}>
          <Loading type="spinningBubbles" color="blue" />
        </div>
      ) : (
        <>
          <div className={style.movie_detail}>
            <h2>{tipo === "movie" ? data.title : data.name}</h2>
            <button onClick={handleModal}>Agregar Calificación</button>
            <img
              src={`${import.meta.env.VITE_IMAGE_ORIGINAL}${data.backdrop_path}`}
              alt={data.title}
              className={style.movie_detail_img}
            />
            <div>

              <p className="center">{data.overview}</p>
              {data.vote_average > 0 && (
                <p className="center">Rating: {data.vote_average}</p>
              )}
              {data.release_date && (
                <p className="center">Fecha de lanzamiento: {data.release_date}</p>
              )}
              {data.first_air_date && (
                <p className="center">Fecha de lanzamiento: {data.first_air_date}</p>
              )}
              {
                data.spoken_languages && data.spoken_languages.length > 0 && (
                  <p className="center">Idioma original: {data.spoken_languages[0].name}</p>
                )
              }
            </div>
            {!trailer && trailer === undefined ? (
              <p className="center">No hay trailer disponible</p>
            ) : (
              <YouTube
                videoId={trailer}
                autoplay={false}
                opts={{
                  height: "390",
                  width: "640",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
            )}

            <h2>Géneros</h2>
            <div className={style.movie_detail_genres}>
              {data.genres?.map((genre) => (
                <div className={style.movie_detail_genres_item} key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>

             {tipo === "movie" ? (
              <h2>Películas similares</h2>
            ) : (
              <h2>Series similares</h2>
            )}
           
            <div className={style.movie_detail_similar}>
              <div className={style.movie_detail_similar_list}>

                {similar.length === 0 && (
                  tipo === "movie" ? (
                    <p>No hay películas similares</p>
                  ) : (
                    <p>No hay series similares</p>
                  )
                )}

                {similar.map((movie) => (
                  <div
                    className={style.movie_detail_similar_item}
                    key={movie.id}
                  >
                    <Link
                      to={`/peliculadetalle/${movie.id}?ismovie=${
                        tipo === "movie" ? "true" : "false"
                      }`}
                    >
                      <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${
                          movie.poster_path
                        }`}
                        alt={movie.title}
                      />
                    </Link>
                    <p>{tipo === "movie" ? movie.title : movie.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            
          </div>
          
        </>
      )}

      {modalShow ? (
        <Modal detalle={data} isMovie={tipo === "movie"} handleModal={handleModal} />
      ) : null}
    </div>
  );
};

export default Detalle;
