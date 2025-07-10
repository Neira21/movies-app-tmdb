import style from "./CategoriaContenedor.module.css";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";



const CategoriaContenedor = ({ category, isMovie }) => {
  CategoriaContenedor.propTypes = {
    category: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
      })
    ).isRequired,
    isMovie: propTypes.bool.isRequired,
  };

  const navigate = useNavigate();

  const handleCategory = (id) => {
    isMovie
      ? navigate(`/peliculalista?genre=${id}`)
      : navigate(`/tvlista?genre=${id}`);
  }

 

  return (
    <section className={style.categories_container}>
        {category || category.length === 0 ? (
          category.map((category) => (
            <div className={style.category_card} key={category.id} onClick={()=>handleCategory(category.id)}>
              <h5 className={style.category_name}>{category.name}</h5>
            </div>
          ))
        ) : (
          <p>No hay categorías de películas disponibles</p>
        )}
      </section>
  )
}

export default CategoriaContenedor