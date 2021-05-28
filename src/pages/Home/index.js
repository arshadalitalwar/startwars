import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from "axios";
let temp={};
let i=0;
function HomePage() {
  const [data,setData]=React.useState([]);
 
  
  const handleKeyDown=(e)=>{
    console.log(e.keyCode)
    if(e.keyCode==40){
      console.log(document.getElementById(`a${i}`));
      i++;
    }
    else{
      i--;

    }
  }
  
  const handleChange=(e)=>{
    let value=e.target.value;
    if(value){
    if(temp[value]===undefined){
     axios.get(`https://swapi.dev/api/people/?search=${e.target.value}`).then((el)=>{  
       setData(el.data.results);
       console.log(value)
       temp[value]=el.data.results;
     });
    }
    else{
      setData(temp[e.target.value]);
    }
  }
  else{
    setData([]);
  }
  }
  
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input className="search-input" onKeyDown={handleKeyDown} style={data.length>0?{borderRadius:"25px 25px 0 0",borderBottom:"1px solid black"}:{}} placeholder="Search by name" onChange={handleChange}  />
     {data.length>0 &&<div   className="search-result">
      {data?.map((e,i)=><div key={i} id={`a${i}`}  style={{color:"white"}}>
      <div>
        <p>{e.name}</p>
        <p className="search-result-birth">{e.birth_year}</p>
      </div>
      <div>
      <p className="search-result-gender">{e.gender}</p>
      </div></div>)
      }
      </div>
      }
    </div>
  );
}

export default HomePage;
