import React ,{useState, useEffect} from 'react';
import { useNavigate  } from "react-router-dom";
import "./Search.css";
import MetaData from '../MetaData/MetaData';
const Search = () => {

 
useEffect(() => {
   
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate ();
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate("/products")
        }
    }
  return (
<> <MetaData title="Search " />
  <div className='search'> 
     <form className='searchBox' onSubmit ={searchSubmitHandler}>
  <input type='text' placeholder="Find Your Delicious 🍴Food..........."
      onChange={(e)=> setKeyword(e.target.value)} />

  <input type='submit' value="Search" className='btn' />

 </form></div>
 </>
   

  )
}

export default Search;