import React, { useState } from "react";
import axios from "axios";
// import navHook from "./nav";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5500";
// const BASE_URL = window.env.REACT_APP_BASE_URL;

const Banner = ({ locationData }) => {
  const [restaurant, setRestaurant] = useState([]);
  const [inputText, setInputText] = useState(undefined);
  const [suggestion, setSuggestion] = useState([]);
  const navigate = useNavigate(); // Access navigate function

  const handleLocation = (e) => {
    const location = e.target.value;

    axios({
      url: `${BASE_URL}/rest/${location}`,
      method: "get",
      headers: {
        "Content-Type": "application/JSON",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        // console.log("res.data.restaurants", res.data.restaurants);
        setRestaurant(res.data.restaurants);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    const { value } = event.target;
    // console.log("value", value);
    setInputText(value);
    const filteredSuggestions = restaurant.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestion(filteredSuggestions);
  };

  const showSuggestion = () => {
    if (suggestion.length === 0 && inputText === undefined) {
      return null;
    }

    if (suggestion.length > 0 && inputText === "") {
      return null;
    }

    if (suggestion.length === 0 && inputText) {
      return <li className="list-unstyled ">Sorry, No Results Found !!</li>;
    }

    return suggestion.map((item, index) => (
      <li
        key={index}
        className="suggList"
        onClick={() => selectRestaurant(item._id)}
      >
        <img src={item.thumb} className="suggImg" alt=" " />{" "}
        <span className="suggName">{item.name}</span>
        <span className="suggLoc">{item.address}</span>{" "}
      </li>
    ));
  };

  const selectRestaurant = (ss) => {
    navigate(`/details?restuarant=${ss}`);
  };

  return (
    <div>
      {/* <!--Banner Part (upper part)--> */}
      <div className="bg-cover bg-image d-flex">
        <div className="container mt-3">
          <div className="row mt-5">
            <div className="col d-flex justify-content-center">
              <div className="text-danger circle_m">
                <h2 className="logo_m">e!</h2>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col d-flex justify-content-center">
              <h3 className="text-light line">
                Find the best restaurants, cafés, and bars
              </h3>
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-center">
            <div className="col selectbar">
              <select
                className="form-control input1 py-2 rounded-lg"
                onChange={handleLocation}
              >
                <option value="0" disabled selected>
                  Please type a location
                </option>
                {locationData?.map((item, index) => {
                  return (
                    <option key={index} value={item.city_id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col input-group searchbar">
              <i className="input-group-text bi bi-search input2"></i>
              <input
                type="text"
                className="form-control input2 py-2 btnborder"
                placeholder="Search for restaurants"
                onChange={handleInput}
              />

              {/* Suggestion Box */}
              <ul className="suggestionBox">{showSuggestion()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
// export default navHook(Banner);
