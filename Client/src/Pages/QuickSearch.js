import React from "react";
// import navHook from "./nav";
import { useNavigate } from "react-router-dom";

const QuickSearch = ({ mealtypeData }) => {
  const navigate = useNavigate();
  // Access navigate function
  const showFilter = (mealTypeId) => {
    // console.log("mealTypeId", mealTypeId);
    navigate(`/filter?mealtype=${mealTypeId}`);
  };

  return (
    <div>
      {/* <!--Quick Searches Part (lower)--> */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div>
            <h3 className="heading">Quick Searches</h3>
            <p className="subheading">Discover restaurants by type of meal</p>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {/* <!--Items--> */}
          {mealtypeData?.map((meal, index) => (
            <div
              key={index}
              className="d-flex box mt-4"
              style={{ border: "1px solid greenyellow", cursor: "pointer" }}
              onClick={() => showFilter(meal._id)}
            >
              <div className="l-box">
                <img
                  src={`./images/${meal.image}`}
                  alt="images_mealtype"
                  className="img-fluid img-qs-m"
                />
              </div>
              <div className="r-box">
                <h4 className="card-title">{meal.name}</h4>
                <p className="card-content">{meal.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
