import style from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className={style.header}>
      <ul className={style.navbar}>
        <li>
          <Link to='/'>
            Inicio
          </Link>
        </li>
        <li>
          <Link to='/peliculalista'>
            Peliculas
          </Link>
        </li>
        <li>
          <Link to='/tvlista'>
            Series
          </Link>
        </li>
        <li>
          <Link to='/peliculasvaloradas'>
            Valoración de películas
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header