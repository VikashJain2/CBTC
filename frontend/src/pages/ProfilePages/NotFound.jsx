import React from 'react'
import search from "../../assets/search.jpg"
const NotFound = ({title}) => {
  return (
    <div className='empty'>
        <p>{title}</p>
        <img src={search} alt="" />
      </div>
  )
}

export default NotFound
