import React, { useState, useEffect } from "react";
import "../Style/frontPage.css"; // importing the CSS
import Banner from "./Banner";
import QuickSearch from "./QuickSearch";
import axios from "axios";

// const BASE_URL = "http://localhost:5500";
const BASE_URL = "https://food-restaurant-app-alpha.vercel.app/";
// const BASE_URL = window.env.REACT_APP_BASE_URL;
// console.log("window.env.REACT_APP_BASE_URL ", window.env.REACT_APP_BASE_URL);

const Homepage = (props) => {
  const [loc, setLoc] = useState([]);
  const [mealtype, setMealtype] = useState([]);

  useEffect(() => {
    // Fetch location data
    axios({
      withCredentials: true,
      url: `${BASE_URL}/location`,
      method: "get",
      headers: {
        "Content-Type": "application/JSON",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        setLoc(res.data.location);
      })
      .catch((err) => console.log(err));

    // Fetch mealtype data
    axios({
      withCredentials: true,
      url: `${BASE_URL}/mealtype`,
      method: "get",
      headers: {
        "Content-Type": "application/JSON",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        setMealtype(res.data.meal);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <!--Banner Part (upper part)--> */}
      <Banner locationData={loc} />

      {/* <!--Quick Searches Part (lower)--> */}
      <QuickSearch mealtypeData={mealtype} />
    </div>
  );
};

export default Homepage;
