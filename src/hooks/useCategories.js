
import { useEffect, useState } from "react"

import { getMoviesOrSeries } from "../utils/queryMovies"

const useTrending = () => {

  const [categoriesMovies, setCategoriesMovies] = useState([])
  const [categoriesTvs, setCategoriesTvs] = useState([])

  const fetchTrending = async () => {
    try {
      // Si uno falla que ya no se ejecute el otro
      const [movies, tvs] = await Promise.all([
        getMoviesOrSeries('genre/movie/list?language=es-ES'),
        getMoviesOrSeries('genre/tv/list?language=es-ES')
      ])
      setCategoriesMovies(movies.genres)
      setCategoriesTvs(tvs.genres)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return {
    categoriesMovies,
    categoriesTvs
  }
}

export default useTrending