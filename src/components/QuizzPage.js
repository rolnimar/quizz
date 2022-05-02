import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import ANIMALS_QUERY from '../queries/animal/animals';
import { NavBar } from './NavBar';
import useGqlQuery from '../hooks/useGqlQuery';
import CustomButton from './CustomButton';
import CategorySection from './CategorySection';
import CATEGORIES_QUERY from '../queries/category/categories';

const QuizzPage = () => {

  const location = useLocation();
  const { categories } = location.state;
  const navigate = useNavigate();
  if(categories.length === 0){
    navigate('/');
  }
  const { data, loading, error} = useGqlQuery(ANIMALS_QUERY,categories);
  

  const [animals,setAnimals] = useState([]);
  const [quizzQuestions, setQuizzQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [iterator,setIterator] = useState(null);
  
  const [fieldOne, setFieldOne] = useState(null);
  const [fieldTwo, setFieldTwo] = useState(null);
  const [fieldThree, setFieldThree] = useState(null);

  const [borderOne, setBorderOne] = useState('border border-blue-500');
  const [borderTwo, setBorderTwo] = useState('border border-blue-500');
  const [borderThree, setBorderThree] = useState('border border-blue-500');
  const rightAnswerStyle = 'outline outline-4 outline-green-800 cursor-not-allowed';
  const wrongAnswerStyle = 'outline outline-4 outline-red-800 cursor-not-allowed';

  const [questionCounter, setQuestionCounter] = useState(1);

  const [disabled, setDisabled] = useState(null);
  const [visibleNext, setVisibleNext] = useState('invisible');
  const [visibleEvaluate, setVisibleEvaluate] = useState(null);

  const [genericName, setGenericName] = useState(null);
  const [specificName, setSpecificName] = useState(null);
  const [className, setClassName] = useState(null);

  
  
  useEffect(()=> {
    if(data && !loading){
      setAnimals(data.animals.data);
      
    }
    
  },[data]);

  useEffect(()=>{
    function getRandomQuestion(){
      const question = animals[Math.floor(Math.random() * animals.length)];
      return question;
    }

    function createQuizz(){
      // if(animals){
      //   if(animals.length >=1){
      //     console.log('>=25 ' + animals.length )
      //     while(quizzQuestions.size<1){
      //       const question = getRandomQuestion(animals);
      //       setQuizzQuestions(prev=> new Set(prev.add(question)));  
      //     }
      //   } else {
      //     console.log('<25 ' + + animals.length)
      //     setQuizzQuestions(new Set(animals));
      //   }
      // }
      
      for (let i = 0; i < 25; i++){
        const question = getRandomQuestion(animals);
        setQuizzQuestions(prev=> new Set(prev.add(question)));
      }
    }
    if(animals.length>0){
      createQuizz();
    }
  },[animals])

  useEffect(()=>{
    if(quizzQuestions.size > 0 && currentQuestion===null){
      setIterator(quizzQuestions.values());
      if(quizzQuestions.size ===1){
        setVisibleNext('invisible');
      }
    }
  },[quizzQuestions]);

  useEffect(()=>{
    if(iterator){
      setCurrentQuestion(iterator.next());
    } 
  }, [iterator])
  



  function nextQuestionToggle(event){
    console.log(quizzQuestions);
    let q = iterator.next();
    // console.log('question' + q.value.id);
    setCurrentQuestion(q);
    // console.log(quizzQuestions);
    setDisabled(false);
    setBorderOne  ('');
    setBorderTwo('');
    setBorderThree('');
    setSpecificName('');
    setGenericName('');
    setClassName('');
    document.getElementById('formInput').reset();
    
    setVisibleEvaluate('visible');
    setVisibleNext('invisible');
    
    
  } 
  
  function evaluateQuestion(event){
    let normalizedOne = '';
    let normalizedTwo = '';
    let normalizedThree = '';
    if(fieldOne === null){
      setBorderOne(wrongAnswerStyle);
    } else {
      normalizedOne = fieldOne.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    if(fieldTwo === null) {
      setBorderTwo(wrongAnswerStyle);
    } else {
      normalizedTwo = fieldTwo.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    if(fieldThree === null){
      setBorderThree(wrongAnswerStyle);
    } else {
      normalizedThree = fieldThree.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    const normalizedGenericName = currentQuestion.value.attributes.genericName.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const normalizedSpecificName = currentQuestion.value.attributes.specificName.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const normalizedClassName = currentQuestion.value.attributes.className.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    if(normalizedOne === normalizedGenericName){
      setBorderOne(rightAnswerStyle);
    } else {
      setBorderOne(wrongAnswerStyle);
    }

    if(normalizedTwo === normalizedSpecificName){
      setBorderTwo(rightAnswerStyle);
    } else {
      setBorderTwo(wrongAnswerStyle);
    }

    if(normalizedThree === normalizedClassName){
      setBorderThree(rightAnswerStyle);
    } else {
      setBorderThree(wrongAnswerStyle);
    }
    setSpecificName(currentQuestion.value.attributes.specificName);
    setGenericName(currentQuestion.value.attributes.genericName);
    setClassName(currentQuestion.value.attributes.className);

    setQuestionCounter(prev=>{
      if(++prev == quizzQuestions.size){
        setVisibleNext('invisible');
      }
      return prev;
    });
    setVisibleNext('visible');

    setDisabled(true);
    setVisibleEvaluate('invisible');
  }

  if(currentQuestion && !loading){
    return (
      <>
        <NavBar />
        <div className="pt-24 h-screen bg-gradient-to-b from-black to-gray-900 font-mono">
          <div className='block ml-auto mr-auto text-white text-center '>                  
                  <div key={currentQuestion.value.id} className='inline-flex flex-col m-0'>
                    
                    
                    <img src={'http://localhost:1337'+currentQuestion.value.attributes.animalPicture.data.attributes.formats.thumbnail.url} 
                        width={currentQuestion.value.attributes.animalPicture.data.attributes.formats.small? currentQuestion.value.attributes.animalPicture.data.attributes.formats.small.width: currentQuestion.value.attributes.animalPicture.data.attributes.formats.thumbnail.width}
                        height={currentQuestion.value.attributes.animalPicture.data.attributes.formats.small? currentQuestion.value.attributes.animalPicture.data.attributes.formats.small.height: currentQuestion.value.attributes.animalPicture.data.attributes.formats.thumbnail.height}/> 
                    
                  </div>
                
            
            
          
          <form id="formInput" >
            <div className="w-full max-w-2xl justify-center flex m-auto">
              <div className="flex flex-wrap -mx-3 mb-6 mt-6 justify-center p-5 w-full">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white  text-lg  font-bold mb-2" htmlFor="grid-first-name">
                {genericName}
              </label>
              <input disabled={disabled} autoComplete="off" onChange={(event)=>setFieldOne(event.target.value)} className= {borderOne +" appearance-none block w-full border  bg-gray-200 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} id="grid-first-name" type="text" placeholder="Rodové jméno">
                
              </input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 ">
              <label className="block uppercase tracking-wide text-white text-lg font-bold mb-2" htmlFor="grid-last-name">
                {specificName}
              </label>
              <input disabled={disabled} autoComplete="off"  onChange={(event)=>setFieldTwo(event.target.value)} className={borderTwo + " appearance-none block w-full bg-gray-200 text-gray-700 border  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} id="grid-second-name" type="text" placeholder="Druhové jméno">
              </input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white  text-lg  font-bold mb-2" htmlFor="grid-middle-name">
                  {className}
                </label>
                <input disabled={disabled} autoComplete="off"  onChange={(event)=>setFieldThree(event.target.value)} className= {borderThree + " appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} id="grid-third-name" type="text" placeholder="Třída">
                  
                </input>
              </div>
              
            </div>
              
            </div>
            <div>
              question {questionCounter}/{quizzQuestions.size}
              </div>
              <div >
                <div type="submit" className={ visibleEvaluate + ' p-5 max-w-fit flex m-auto justify-center'} onClick={(event)=>evaluateQuestion(event)}>
                  <CustomButton >Evaluate</CustomButton>
                </div>
                <div className= {visibleNext + ' max-w-fit flex m-auto justify-center' } onClick={(event)=>nextQuestionToggle(event)}>
                  <CustomButton>Next question</CustomButton>
                </div>
              </div>
          </form>
          
        </div>
      </div>
      </>
    )
  } else {
    return (
      <>
       <div className="pt-24 h-screen bg-gradient-to-b from-black to-gray-900 font-mono flex justify-center">
        <div className='text-white'>
          Loading...
        </div>
      </div>
      </>
    )
  }
}

export default QuizzPage;