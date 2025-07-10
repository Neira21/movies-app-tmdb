import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import ListaPelicula from './pages/ListaPelicula'
import ListaTv from './pages/ListaTv'
import DetallePelicula from './pages/DetallePelicula'
import DetalleTv from './pages/DetalleTv'
import Error from './pages/Error'
import Header from './components/Header'
import ListaPeliculasValoradas from './pages/ListaPeliculasValoradas'

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route index path='/' element={<Inicio/>} />
        <Route path='/peliculalista' element={<ListaPelicula/>} />
        <Route path='/tvlista' element={<ListaTv/>} />
        <Route path='/peliculadetalle/:id' element={<DetallePelicula/>} />
        <Route path='/tvdetalle/:id' element={<DetalleTv/>} />
        <Route path='/peliculasvaloradas' element={<ListaPeliculasValoradas/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  )
}

export default App