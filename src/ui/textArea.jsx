import React from 'react'

const TextArea = ({label, state, setState, height = "100px"}) => {
  return (
    <div className="form-floating">
        <textarea className="form-control my-3" value={state} onChange={ e => setState( e.target.value )} placeholder={label} id="floatingTextarea2" style={{height: height}}></textarea>
        <label htmlFor="floatingTextarea2">{label}</label>
    </div>
  )
}

export default TextArea