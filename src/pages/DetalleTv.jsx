import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Detalle from '../components/Detalle'
//import { getMoviesOrSeries } from '../utils/queryMovies.js'
import axios from 'axios'


const DetallePelicula = () => {
  
  const location = useLocation();
  

  const { id } = useParams()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const isMovieParam = queryParams.get('ismovie');

  // Verificar que el valor sea 'true' o que simplemente no exista, y considerar 'movie' como predeterminado
  const tipo = isMovieParam === 'true' || isMovieParam === null ? 'movie' : 'tv';

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false) 
  const [trailer, setTrailer] = useState('')
  const [similar, setSimilar] = useState([])
  
  const getMovie = async (id) => {
    try {
      setLoading(true)
      setSimilar([]);  // Resetear el estado de similares antes de la nueva búsqueda
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${tipo}/${id}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: 'videos'
        }
      })
      const data = response.data
      //82770
      setData(data)
      setLoading(false)
      if(data && data.videos && data.videos.results.length > 0){
        const key = data.videos.results.find(video => video.type= 'Trailer').key
        setTrailer(key)
      }else{
        setTrailer(undefined)
      }

      if(data && data !== undefined
      ){
        const response2 = await axios.get(`${import.meta.env.VITE_API_URL}${tipo}/${id}/similar`,{
          params: {
            api_key: import.meta.env.VITE_API_KEY
          }
        })
        const data2 = await response2.data.results
        const validResult = await data2.filter((movie) => movie.poster_path !== null).slice(0, 4)
        setSimilar(validResult)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Cada vez que el ID en la URL cambie, ejecuta la función para buscar los detalles de la nueva película
    getMovie(id);
  }, [id, tipo]); // El useEffect se vuelve a ejecutar cuando el ID cambia

  const regresarAnterior = () => {
    navigate(-1)
  }

  
  return (
    <>
    <button onClick={regresarAnterior} >
      Regresar
    </button>
    <Detalle data={data} loading={loading} tipo={tipo} trailer={trailer} similar={similar} />
    </>
  )
}

export default DetallePelicula