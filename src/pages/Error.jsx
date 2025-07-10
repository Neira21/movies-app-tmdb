import notFound from '../assets/notfound.webp'

const Error = () => {
  return (
    <div className='not-found'>
      <h2>PAGE NOT FOUND</h2>
      <div>
        <img src={notFound} alt="notfound" />
      </div>
      
    </div>
  )
}

export default Error