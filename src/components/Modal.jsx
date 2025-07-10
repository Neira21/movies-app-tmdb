import useForm from "../hooks/useForm";
import style from "./Modal.module.css";

//importar proptypes
import PropTypes from "prop-types";

const Modal = ({ detalle, isMovie, handleModal }) => {
  Modal.propTypes = {
    detalle: PropTypes.object.isRequired,
    isMovie: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
  };

  const { calificacion, inputChange } = useForm({ calificacion: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarCalificacion();
    handleModal();
  };

  const agregarCalificacion = async () => {
    const numero = parseFloat(calificacion);

    const isValid = numero > 0 && numero <= 10 && (numero * 10) % 5 === 0;

    if (!isValid) {
      alert(
        "La calificación debe ser un número entre 1 y 10 y múltiplo de 0.5 (ejemplo: , 1, 1.5,, 6.5, 8..., 9.5, 10)"
      );
      return;
    }

    const url = isMovie
      ? `${import.meta.env.VITE_API_URL}movie/${detalle.id}/rating?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      : `${import.meta.env.VITE_API_URL}tv/${detalle.id}/rating?api_key=${
          import.meta.env.VITE_API_KEY
        }`;

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: numero }),
    });
  };

  return (
    <div className={style.modal}>
      <div className={style.modal_contenedor}>
        <div className={style.modal_header}>
          <h2 className={style.modal_title}>{detalle.title}</h2>
        </div>

        <div className={style.modal_imagen}>
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}${detalle.poster_path}`}
            alt={detalle.title}
          />
        </div>

        <p>Agregar Calificación (0 - 10)</p>
        <div className={style.modal_body}>
          <form className={style.form} onSubmit={handleSubmit}>
            <input
              className={style.forminput}
              name="calificacion"
              placeholder="Calificación..."
              onChange={inputChange}
              value={calificacion}
              type="number"
              min="0"
              max="10"
              step="0.5"
            />
            <div>
              <button className={style.modal_btn_agregar} type="input">
                Agregar
              </button>
            </div>
          </form>
        </div>
        <div className={style.modal_footer}>
          <button className={style.modal_btn} onClick={handleModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
