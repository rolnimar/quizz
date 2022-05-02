import React, { useEffect, useState } from 'react'

import CategorySection from './CategorySection';
import { NavBar } from './NavBar';


const HomePage = () => {

  const [category, setCategory] = useState([]);
  

  // if(!loading) return <p>"WHAT THE HELL"</p>


    return (
      <>
        <div className="h-screen bg-gradient-to-b from-black to-gray-900 font-mono">
          <NavBar />
          <CategorySection/>
        </div>
      </>
    )
}

export default HomePage;
