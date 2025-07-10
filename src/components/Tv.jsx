import { Link } from "react-router-dom";
import noImage from "../assets/noimagen.png";
import { useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

const Tv = ({ tv, isMovie }) => {
  Tv.propTypes = {
    tv: PropTypes.object.isRequired,
    isMovie: PropTypes.bool.isRequired,
  };

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const tvPoster = tv.poster_path
    ? `${import.meta.env.VITE_IMAGE_URL}${tv.poster_path}`
    : noImage;

  return (
    <div className="card" key={tv.id}>
      <h2>{tv.name}</h2>
      <Link to={`/tvdetalle/${tv.id}?ismovie=${isMovie}`}>
        <img src={tvPoster} alt={tv.title} />
      </Link>
      <button onClick={handleModal}>Agregar Calificación</button>
      {modal ? <Modal detalle={tv} isMovie={isMovie} handleModal={handleModal} /> : null}
    </div>
  );
};

export default Tv;
