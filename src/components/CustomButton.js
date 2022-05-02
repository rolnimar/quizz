import React from 'react'

const CustomButton = (
    {children}
    
  ) => {
    const twProps ="rounded-none text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
  return (
    <button type="button" className= {twProps}>
        {children}
    </button>
  )
}

export default CustomButton;