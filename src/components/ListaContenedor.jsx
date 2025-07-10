import Pelicula from "./Pelicula"
import Tv from "./Tv"
import Loading from "./Loading";
import Proptypes from 'prop-types';
//import CategoriaContenedor from "./CategoriaContenedor";

const ListaContenedor = ({data, isMovie}) => {
  ListaContenedor.propTypes = {
    data: Proptypes.shape({
      loading: Proptypes.bool.isRequired,
      info: Proptypes.array.isRequired,
      error: Proptypes.object
    }).isRequired,
    isMovie: Proptypes.bool.isRequired
  }


  return (
      <div className="list">
        {
          data.loading && <div className="center"> 
          <Loading type='spinningBubbles' color='blue' />
          </div>
        }
        
        {
          data?.info?.length === 0 && !data.loading && 
            <h3 style={{textAlign:'center'}}>No hay información para mostrar, prueba en cambiar entre películas o series</h3>
        }
        {/* Mostrar la lista de películas/series si hay resultados y no está cargando */}
        {

          isMovie 
            ? !data.loading && data?.info?.length > 0 && (
              data?.info.map(movie => (
              <Pelicula key={movie.id} movie={movie} isMovie={true} />
            ))
          )

          : !data.loading && data.info.length > 0 && (
            data?.info.map(tv => (
              <Tv key={tv.id} tv={tv} isMovie={false} />
            ))
          )
        }
      </div>
  )
}

export default ListaContenedor