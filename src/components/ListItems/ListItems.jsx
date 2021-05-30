import React from "react";
import { useHistory } from "react-router";
import "./ListItem.css";

function ListItems({ checkRef = 0, i = 0, name, birth_year, gender, url }) {
  const history = useHistory();

  const handleClick = (e) => {
    let temp = e.split("/");
    history.push(`/character/${temp[temp.length - 2]}`);
  };

  return (
    <div
      onClick={() => handleClick(url)}
      className={checkRef === i ? "listItemSelect" : "listItem"}
    >
      <div>
        <p style={{ marginLeft: 10 }}>{name}</p>
        <p className="search-result-birth">{birth_year}</p>
      </div>
      <div>
        <p className="search-result-gender">{gender}</p>
      </div>
    </div>
  );
}

export { ListItems };
