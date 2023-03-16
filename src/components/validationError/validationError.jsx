import { useCallback } from 'react'
import { useSelector } from 'react-redux'

const ValidationError = () => {
  const { error } = useSelector( state => state.auth )
  console.log(error);
  const errorMessage = useCallback( () => {
    return Object.keys(error).map( name => {
      const msg = error[name].join(', ')
      return `${name} - ${msg}`
    } )
  }, [error] )
  console.log( error !== null && errorMessage())


  return (
    error !== null && 
            errorMessage().map( (item) => {
             return <div key={item} className="alert alert-danger p-2 " role="alert">{item}</div>
        })
  )
}

export default ValidationError