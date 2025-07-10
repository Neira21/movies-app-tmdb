import { Link } from "react-router-dom";
import noImage from "../assets/noimagen.png";
import { useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

const Pelicula = ({ movie, isMovie }) => {
  Pelicula.propTypes = {
    movie: PropTypes.object.isRequired,
    isMovie: PropTypes.bool.isRequired,
  };

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const moviePoster = movie.poster_path
    ? `${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`
    : noImage;

  return (
    <div className="card" key={movie.id}>
      <h2>{movie.title}</h2>
      <Link to={`/peliculadetalle/${movie.id}?ismovie=${isMovie}`}>
        <img src={moviePoster} alt={movie.title} />
      </Link>
      <button onClick={handleModal}>Agregar Calificación</button>
      {modal ? (
        <Modal detalle={movie} isMovie={isMovie} handleModal={handleModal} />
      ) : null}
    </div>
  );
};

export default Pelicula;
