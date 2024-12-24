import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Filter from "./Filter";
import Details from "./Details";
import Header from "./Header";
import { useEffect, useState } from "react";

const BASE_URL = "https://food-restaurant-app-alpha.vercel.app/";
// const BASE_URL = "http://localhost:5500";
// const BASE_URL = window.env.REACT_APP_BASE_URL;

const Router = () => {
  const [user, setUser] = useState(null);
  // console.log("user", user);

  useEffect(() => {
    const getUser = () => {
      fetch(`${BASE_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/JSON",
          "Content-Type": "application/JSON",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication Failed");
        })
        .then((resObject) => {
          // console.log("resObject", resObject);

          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/details" element={<Details />} />

        <Route path="/success" element={<Home payStatus="success" />} />
        <Route path="/cancel" element={<Home payStatus="fail" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
