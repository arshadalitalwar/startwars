import React, { useEffect, useState } from "react";
import logo from "./star-wars-logo.png";
import searchLogo from "./search.png";
import closeLogo from "./close.png";
import loadingLogo from "./loading.png";
import "./index.css";
import axios from "axios";
import { ListItems } from "../../components/ListItems/ListItems";
import { List } from "../../components/List/List";
import { useHistory } from "react-router";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [checkRef, setcheckRef] = useState(-1);
  const [timer, setTimer] = useState(null);
  const [search, setSearch] = useState("");
  const history = useHistory();

  //to select element by arrow keys
  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      if (checkRef === 3 || checkRef === data.length - 1) {
        setcheckRef(0);
      } else {
        setcheckRef((prev) => prev + 1);
      }
    } else if (e.keyCode === 38) {
      if (checkRef === 0) {
        if (data.length >= 3) {
          setcheckRef(3);
        } else {
          setcheckRef(data.length - 1);
        }
      } else {
        setcheckRef((prev) => prev - 1);
      }
    }
  };

  //handle search with optimize to call api
  const handleChange = (e) => {
    setcheckRef(-1);
    let { value } = e.target;
    setSearch(value);

    if (timer) {
      clearTimeout(timer);
    }

    let temp = setTimeout(() => {
      if (value) {
        setIsLoading(true);
        axios
          .get(`https://swapi.dev/api/people/?search=${value}`)
          .then((el) => {
            setData(el.data.results);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
        setTimer(null);
      } else {
        setData([]);
      }
    }, 500);
    setTimer(temp);
  };
  useEffect(() => {
    if (checkRef >= 0 && checkRef < data.length) {
      setSearch(data[checkRef].name);
    }
  }, [checkRef,data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      let searchValue = data.filter((e) => e.name === search);
      if (searchValue.length > 0) {
        let temp = searchValue[0].url.split("/");
        history.push(`/character/${temp[temp.length - 2]}`);
      } else {
        history.push(`/notfound`);
      }
    }
  };
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="search-input"
          onKeyDown={handleKeyDown}
          style={
            data.length > 0
              ? {
                  borderRadius: "25px 25px 0 0",
                  borderBottom: "1px solid black",
                }
              : {}
          }
          value={search}
          placeholder="Search by name"
          onChange={handleChange}
        />
        <div onClick={handleSubmit} className="searchLogo">
          <img src={searchLogo} alt="search"></img>
        </div>
        {isLoading && (
          <div className="loadingLogo">
            <img src={loadingLogo} alt="search"></img>
          </div>
        )}
        {search && (
          <div
            onClick={() => handleChange({ target: { value: "" } })}
            className="closeLogo"
          >
            <img src={closeLogo} alt="close"></img>
          </div>
        )}
      </form>
      {data.length > 0 && (
        <List>
          {data?.map((e, i) => (
            <ListItems key={i} {...e} checkRef={checkRef} i={i}></ListItems>
          ))}
        </List>
      )}
    </div>
  );
}

export default HomePage;
