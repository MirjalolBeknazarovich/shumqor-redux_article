import React from 'react'

const Btn = ({ nameBtn, className, type = 'submit' }) => {
  return (
    <button className={className} type={type}>{nameBtn}</button>
  )
}

export default Btn