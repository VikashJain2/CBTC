import React from 'react'
import './Banner.css'
const Banner = () => {
  return (
    <div className='banner'>
      
      <div className="banner-text">
        <h1>Spotlight Your <span>Creativity</span> <br /> Create <span>Unforgettable</span> Events</h1>
      </div>
        <p className='para'>RSVP and Management Made Effortless for Creators</p>
      <div className="banner-button">
        <button>Get Started</button>
        <button>Explore Events</button>
      </div>
    </div>
  )
}

export default Banner
