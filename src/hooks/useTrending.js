
import { useEffect, useState } from "react"

import { getMoviesOrSeries } from "../utils/queryMovies"

const useTrending = () => {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTvs, setTrendingTvs] = useState([])

  const fetchTrending = async () => {
    try {
      // Si uno falla que ya no se ejecute el otro
      const [movies, tvs] = await Promise.all([
        getMoviesOrSeries('/trending/movie/day'),
        getMoviesOrSeries('/trending/tv/day')
      ])
      setTrendingMovies(movies)
      setTrendingTvs(tvs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return {
    trendingMovies: trendingMovies.results,
    trendingTvs: trendingTvs.results
  }
}

export default useTrending