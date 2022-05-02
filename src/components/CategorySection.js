import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';
import CATEGORIES_QUERY from '../queries/category/categories';
import useGqlQuery from '../hooks/useGqlQuery';




const CategorySection = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {data, loading, error} = useGqlQuery(CATEGORIES_QUERY)
  
  const addCategory = (item) =>{
    setSelectedCategories(selectedCategories => (
      [...selectedCategories,item]
    ))
  }
  
  const removeCategory = (item) => {
    const index = selectedCategories.findIndex(categoryId => categoryId === item)
    if(index > -1){
      selectedCategories.splice(index,1);
      setSelectedCategories(selectedCategories)
    }
  }

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories])

  const handleChange = (item, checked) => {
    checked ?
      addCategory(item):
      removeCategory(item);
  }

  
    
   
  if(!loading && data) {
    console.log(data)
    return (
      <div>
        <div className="container flex-col pt-24">
            <div className="flex justify-center">
                <div className="form-check justify-center flex p-5 flex-wrap ">
                  {
                    data.categories.data.map((category) => {
                      return (
                        <div key={category.id} className='inline-block justify-center text-lg border-[1px] border-opacity-25'>
                          <input  onChange={(e)=>handleChange(category.id,e.target.checked)} className="form-check-input appearance-none h-4 w-4 border border-gray-300  bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left m-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                          <label className="align-middle min-w-[10rem] self-baseline text-center form-check-label inline-block text-white" htmlFor="flexCheckDefault">
                            <div className='text-white'>{category.attributes.categoryName}</div>
                          </label>
                        </div>
                      )
                    })
                  }
              </div>
            </div>
        </div>
        <div className='flex justify-center'>
          <Link to="/quizz" state={{categories: selectedCategories}}><CustomButton>Start the quizz</CustomButton></Link>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        Loading...
      </div>
    )
  }
}

export default CategorySection;