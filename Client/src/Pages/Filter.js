import React from "react";
import axios from "axios";
import queryString from "query-string";
import navHook from "./nav";
import "../Style/filterPage.css";

// const BASE_URL = "https://food-restaurant-app-alpha.vercel.app/";
const BASE_URL = "http://localhost:5500";
// const BASE_URL = window.env.REACT_APP_BASE_URL;

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      loc: [],
      restaurant: [],
      Cuisine: [],
      sort: 1,
      page: 1,
      mealt: [],
    };
  }

  // Post mealtype API
  componentDidMount() {
    const q = queryString.parse(window.location.search);
    const { mealtype } = q;
    const meal = parseInt(mealtype);
    // const int = parseInt(mealtype);

    const filterObj = {
      mealtype: meal,
      //   mealtype: int,
    };

    axios({
      url: `${BASE_URL}/filter`,
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      data: filterObj,
    })
      .then((res) => {
        // console.log("res", res);
        this.setState({ restaurant: res.data.restaurants, mealtype: meal });
        // setState({ restaurant: res.data.restaurants, mealtype: meal });
        // setState({ restaurant: res.data.restaurants, mealtype: int });
      })
      .catch((err) => console.log(err));

    // Mealtype
    axios({
      url: `${BASE_URL}/meal/${meal}`,
      //   url: `${BASE_URL}/meal/${int}`,
      method: "get",
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => {
        // console.log("res", res.data);
        this.setState({ mealt: res.data.mealtype });
      })
      .catch((err) => console.log(err));

    // GET location API
    axios({
      url: `${BASE_URL}/location`,
      method: "get",
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => {
        // console.log("res", res.data);
        this.setState({ loc: res.data.location });
      })
      .catch((err) => console.log(err));
  }

  // POST location API
  handleLocation = (val) => {
    const { lcost, hcost, Cuisine, sort, page, mealtype } = this.state;
    const loca = val.target.value;

    const filterObj = {
      //   loca,
      location: loca,
      lcost,
      hcost,
      Cuisine,
      sort,
      page,
      mealtype,
    };

    axios({
      url: `${BASE_URL}/filter`,
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      data: filterObj,
    })
      .then((res) => {
        // console.log("res", res.data);
        this.setState({ restaurant: res.data.restaurants, loca });
      })
      .catch((err) => console.log(err));
  };

  // handle Cuisine
  handleCuisine = (i) => {
    const { loca, lcost, hcost, sort, page, mealtype } = this.state;

    let tempCuisine = this.state.Cuisine.slice();

    if (tempCuisine.indexOf(i) === -1) {
      tempCuisine.push(i);
    } else {
      tempCuisine.splice(tempCuisine.indexOf(i), 1);
    }

    const filterObj = {
      location: loca,
      lcost,
      hcost,
      cuisine: tempCuisine.length > 0 ? tempCuisine : undefined,
      sort,
      page,
      mealtype,
    };

    axios({
      url: `${BASE_URL}/filter`,
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      data: filterObj,
    })
      .then((res) => {
        // console.log("res", res.data);
        this.setState({
          restaurant: res.data.restaurants,
          Cuisine: tempCuisine,
        });
      })
      .catch((err) => console.log(err));
  };

  // handle Cost
  handleCost = (lcost, hcost) => {
    const { loca, Cuisine, sort, page, mealtype } = this.state;

    const filterObj = {
      location: loca,
      lcost,
      hcost,
      Cuisine,
      sort,
      page,
      mealtype,
    };

    axios({
      url: `${BASE_URL}/filter`,
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      data: filterObj,
    })
      .then((res) => {
        // console.log("res", res.data);
        this.setState({ restaurant: res.data.restaurants, lcost, hcost });
      })
      .catch((err) => console.log(err));
  };

  // handle Sort
  handleSort = (sort) => {
    const { loca, Cuisine, lcost, hcost, page, mealtype } = this.state;

    const filterObj = {
      location: loca,
      lcost,
      hcost,
      Cuisine,
      sort,
      page,
      mealtype,
    };

    axios({
      url: `${BASE_URL}/filter`,
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({ restaurant: res.data.restaurants, sort });
      })
      .catch((err) => console.log(err));
  };

  // handle Page
  handlePage = (page) => {
    const { loca, Cuisine, lcost, hcost, sort, mealtype } = this.state;

    const filterObj = {
      location: loca,
      lcost,
      hcost,
      Cuisine,
      sort,
      page,
      mealtype,
    };

    axios({
      url: `${BASE_URL}/filter`,
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      data: filterObj,
    })
      .then((res) => {
        // console.log("res", res.data);
        this.setState({ restaurant: res.data.restaurants, page });
      })
      .catch((err) => console.log(err));
  };

  // Navigate
  handleNavigate = (ss) => {
    this.props.navigate(`/details?restuarant=${ss}`);
  };

  render() {
    const { loc, restaurant, mealt } = this.state;
    // console.log("loc", loc);
    // console.log("mealt", mealt);
    // console.log("restaurant", restaurant);

    return (
      <div>
        {/* <!--Navbar--> */}
        <nav className="navbar bg-danger" data-bs-theme="">
          <div className="container">
            <div className="navbar-brand text-danger circle">
              <h2 className="logo">e!</h2>
            </div>
          </div>
        </nav>

        {/* <!--Filter Page--> */}
        <div className="container mb-5">
          <h2 className="filter-heading mt-3">{mealt.name} Places in Mumbai</h2>

          {/* <!--Filters--> */}
          <div className="filter-box mt-2 pb-4">
            <h5 className="filter-heading mt-2">Filters</h5>
            <p className="filter-subheading">Select Location</p>
            <select
              className="form-control selectLocation"
              onChange={this.handleLocation}
            >
              <option value="0" disabled selected>
                Select Location
              </option>
              {loc.map((item, index) => {
                return (
                  <option key={index} value={item.city_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <p className="filter-subheading mt-4">Cuisine</p>
            <input
              type="checkbox"
              id="North_Indian"
              name="Cuisine"
              value="North Indian"
              onChange={() => this.handleCuisine(1)}
            />{" "}
            <label for="North_Indian" className="filter-content">
              North Indian
            </label>{" "}
            <br />
            <input
              type="checkbox"
              id="South_Indian"
              name="Cuisine"
              value="South Indian"
              onChange={() => this.handleCuisine(2)}
            />{" "}
            <label for="South_Indian" className="filter-content">
              South Indian
            </label>{" "}
            <br />
            <input
              type="checkbox"
              id="Chinese"
              name="Cuisine"
              value="Chinese"
              onChange={() => this.handleCuisine(3)}
            />{" "}
            <label for="Chinese" className="filter-content">
              Chinese
            </label>{" "}
            <br />
            <input
              type="checkbox"
              id="Fast_Food"
              name="Cuisine"
              value="Fast Food"
              onChange={() => this.handleCuisine(4)}
            />{" "}
            <label for="Fast_Food" className="filter-content">
              Fast Food
            </label>{" "}
            <br />
            <input
              type="checkbox"
              id="Street_Food"
              name="Cuisine"
              value="Street Food"
              onChange={() => this.handleCuisine(5)}
            />{" "}
            <label for="Street_Food" className="filter-content">
              Street Food
            </label>{" "}
            <br />
            <p className="filter-subheading mt-4">Cost For Two</p>
            <input
              type="radio"
              id="500"
              name="costfortwo"
              value="Less than 500"
              onChange={() => this.handleCost(1, 500)}
            />{" "}
            <label for="500" className="filter-content">
              Less than `500
            </label>{" "}
            <br />
            <input
              type="radio"
              id="1000"
              name="costfortwo"
              value="500 to 1000"
              onChange={() => this.handleCost(500, 1000)}
            />{" "}
            <label for="1000" className="filter-content">
              ` 500 to ` 1000
            </label>{" "}
            <br />
            <input
              type="radio"
              id="1500"
              name="costfortwo"
              value="1000 to 1500"
              onChange={() => this.handleCost(1000, 1500)}
            />{" "}
            <label for="1500" className="filter-content">
              ` 1000 to ` 1500
            </label>{" "}
            <br />
            <input
              type="radio"
              id="2000"
              name="costfortwo"
              value="1500 to 2000"
              onChange={() => this.handleCost(1500, 2000)}
            />{" "}
            <label for="2000" className="filter-content">
              ` 1500 to ` 2000
            </label>{" "}
            <br />
            <input
              type="radio"
              id="2000+"
              name="costfortwo"
              value="2000+"
              onChange={() => this.handleCost(2000, 5000)}
            />{" "}
            <label for="2000+" className="filter-content">
              ` 2000+
            </label>{" "}
            <br />
            <h5 className="filter-heading mt-4">Sort</h5>
            <input
              type="radio"
              id="ltoh"
              name="Sort"
              value="Price low to high"
              onClick={() => this.handleSort(1)}
            />
            <label for="ltoh" className="filter-content">
              Price low to high
            </label>{" "}
            <br />
            <input
              type="radio"
              id="htol"
              name="Sort"
              value="Price high to low"
              onClick={() => this.handleSort(-1)}
            />
            <label for="htol" className="filter-content">
              Price high to low
            </label>{" "}
            <br />
          </div>

          {/* <!--Filter Result--> */}
          <div className="result-box mt-2">
            {/* <!-- Result --> */}
            {restaurant.length > 0 ? (
              restaurant.map((res, index) => {
                return (
                  <div
                    key={index}
                    className="results"
                    onClick={() => this.handleNavigate(res._id)}
                  >
                    <div className="d-flex">
                      <div className="lt-box">
                        <img
                          src={res.thumb}
                          alt="resImage"
                          className="img-fluid img-qs"
                        />
                      </div>
                      <div className="rt-box">
                        <h4 className="result-heading">{res.name}</h4>
                        <p className="result-subheading">{res.city_name}</p>
                        <p className="result-text">{res.address}</p>
                      </div>
                    </div>

                    <hr style={{ color: "grey;" }} />

                    <div className="d-flex">
                      <div className="ll-box">
                        <p className="result-text">CUISINES:</p>
                        <p className="result-text">COST FOR TWO:</p>
                      </div>
                      <div className="rl-box">
                        <p className="result-text-blue">
                          {res.Cuisine.map((cu) => `${cu.name}, `)}
                        </p>
                        <p className="result-text-blue">₹{res.cost}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div> Sorry, No Results found... </div>
            )}

            {/* <!--Pagination--> */}
            <div className="mt-5">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="<">
                    <span> {"<"} </span>
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="1"
                    onClick={() => this.handlePage(1)}
                  >
                    {" "}
                    1{" "}
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="2"
                    onClick={() => this.handlePage(2)}
                  >
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="3"
                    onClick={() => this.handlePage(3)}
                  >
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="4"
                    onClick={() => this.handlePage(4)}
                  >
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="5"
                    onClick={() => this.handlePage(5)}
                  >
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href=">">
                    <span> {">"} </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default navHook(Filter);
