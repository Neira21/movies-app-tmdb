import useForm from '../hooks/useForm'
import { BiSolidSearch } from "react-icons/bi";
import PropTypes from 'prop-types'
import { useEffect } from 'react';


const PeliculaFormulario = ({setSearch}) => {
  PeliculaFormulario.propTypes = {
    setSearch: PropTypes.func.isRequired
  }
  
  const initialState = {
    search: ''
  }

  const {search, formState, inputChange } = useForm(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  useEffect(()=>{
    setSearch(formState.search)
  },[formState])

  return (
    <form onSubmit={handleSubmit} >
      <input 
        type="text" 
        name='search'
        placeholder='Ingrese el título'
        value={search}
        onChange={inputChange}
      />
      <button>
        <BiSolidSearch size={20} color='purple' />
      </button>
    </form>
  )
}

export default PeliculaFormulario