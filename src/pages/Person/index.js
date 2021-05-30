import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./index.css";

const init={
  name:"name",
  gender:"gender",
  birth_year:"BY",
  height:"height"
}

function Person() {
  let [data, setData] = useState(init);
  let param = useParams();
  let history = useHistory();

  useEffect(() => {
    let {id}=param;
    console.log(id);
    axios.get(`https://swapi.dev/api/people/${id}/`).then((e) => {
      setData(e.data);
      console.log(e.data);
    }).catch((err)=>{
      console.log(err);
    });
  }, []);


  return (
    <div className="person">
      <div>
        <h1>{data.name}</h1>
        <div>
          <div>
            <h3>Gender</h3>
            <h3>{data.gender}</h3>
          </div>
          <div>
            <h3>Birth Year</h3>
            <h3>{data.birth_year}</h3>
          </div>
          <div>
            <h3>Height</h3>
            <h3>{data.height}</h3>
          </div>
        </div>
        <button onClick={() => history.push("/")}>Back</button>
      </div>
    </div>
  );
}

export default Person;
