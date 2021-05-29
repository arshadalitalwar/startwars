import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./index.css";

function Person() {
  let [data, setData] = useState({});
  let param = useParams();
  let history = useHistory();

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${param.id}`).then((e) => {
      setData(e.data);
      console.log(e.data);
     
    });
  }, [param]);


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
