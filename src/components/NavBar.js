import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div>
      
      <nav className="absolute uppercase font-mono flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-black text-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <Link to="/"><p className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</p></Link>
        </div>
        <div>
      
        </div>
      </nav>
    </div>
  )
}
