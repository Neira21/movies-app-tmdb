import { useState } from "react"

const useForm = (initialState = {}) => {

  const [formState, setFormState] = useState(initialState)

  const inputChange = (e) => {
    const {value, name} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  return {

    ...formState,
    formState,
    inputChange
  }
}

export default useForm