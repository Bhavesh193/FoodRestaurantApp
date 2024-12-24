import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../Style/detailPage.css";

const BASE_URL = "https://food-restaurant-app-alpha.vercel.app/";
// const BASE_URL = "http://localhost:5500";
// const BASE_URL = window.env.REACT_APP_BASE_URL;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Details = () => {
  const [restaurant, setRestaurant] = useState({});
  const [resId, setResId] = useState(undefined);
  const [galleryModal, setGalleryModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [menu, setMenu] = useState([]);
  const [formModal, setFormModal] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const q = queryString.parse(window.location.search);
    // console.log("q", q);

    const { restuarant } = q;

    axios({
      url: `${BASE_URL}/restaurants/${restuarant}`,
      method: "get",
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => {
        setRestaurant(res.data.restaurants);
        setResId(restuarant);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModal = (state, value) => {
    // console.log("state", state);

    if (state === "menuModal" && value === true) {
      axios({
        url: `${BASE_URL}/menu/${resId}`,
        method: "get",
        headers: { "Content-Type": "application/JSON" },
      })
        .then((res) => {
          // console.log("res", res);
          setMenu(res.data.menuItem);
        })
        .catch((err) => console.log(err));
    }

    if (state === "galleryModal") setGalleryModal(value);
    if (state === "menuModal") setMenuModal(value);
    if (state === "formModal") setFormModal(value);
  };

  const addItems = (index, operationType) => {
    let total = 0;
    const updatedMenu = [...menu];
    // console.log("updatedMenu", updatedMenu);
    const item = updatedMenu[index];

    if (operationType === "add") {
      item.qty += 1;
    } else {
      item.qty -= 1;
    }

    updatedMenu[index] = item;
    // console.log("updatedMenu[index]", updatedMenu[index]);
    updatedMenu.forEach((x) => {
      total += x.qty * x.price;
    });
    setMenu(updatedMenu);
    setSubtotal(total);
  };

  const initPayment = (data) => {
    // console.log("Data", data);

    const options = {
      key: "rzp_test_YdnbVmUOubHis2",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);

        try {
          const verifyResponse = await axios.post(
            `${BASE_URL}/api/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );
          // console.log("Payment verification response:", verifyResponse.data);
          alert("Payment successful and verified!");
        } catch (error) {
          console.error(
            "Error verifying payment:",
            error.response || error.message
          );
          alert("Payment verification failed. Please try again...");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const razorpayPayment = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/payment/orders`, {
        amount: subtotal,
      });
      initPayment(data.data);
    } catch (error) {
      console.error(
        "Error initiating Razorpay payment:",
        error.response || error.message
      );
      alert("Failed to create Razorpay order. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar bg-danger" data-bs-theme="">
        <div className="container">
          <div className="navbar-brand text-danger circle">
            <h2 className="logo">e!</h2>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="bannerCover">
          <img src={restaurant.thumb} className="banner" alt=" " />
          <input
            type="button"
            value="Click to see Image Gallery"
            className="gallery_button"
            onClick={() => handleModal("galleryModal", true)}
          />
        </div>

        <div>
          <h2 className="heading mt-4">{restaurant.name}</h2>
        </div>

        <div>
          <input
            type="button"
            className="btn btn-danger order_button"
            value="Place Online Order"
            onClick={() => handleModal("menuModal", true)}
          />
        </div>

        {/* TABS */}
        <div className="tabs">
          <div className="tab">
            <input type="radio" id="tab-1" name="tab-group" defaultChecked />
            <label htmlFor="tab-1">Overview</label>
            <div className="content">
              <div className="about">About this place</div>
              <div className="head">Cuisine</div>
              <div className="value">
                {restaurant?.Cuisine?.map((cu) => `${cu.name}, `)}
              </div>
              <div className="head">Average Cost</div>
              <div className="value">
                ₹{restaurant.cost} for two people (approx.)
              </div>
            </div>
          </div>

          <div className="tab ms-4">
            <input type="radio" id="tab-2" name="tab-group" />
            <label htmlFor="tab-2">Contact</label>
            <div className="content">
              <div className="value">Phone Number</div>
              <div className="value-red">+91 {restaurant.contact_number}</div>
              <div className="head">{restaurant.name}</div>
              <div className="value">{restaurant.address}</div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={galleryModal} style={customStyles}>
        <div
          onClick={() => handleModal("galleryModal", false)}
          className="close"
        >
          <i className="bi bi-x-lg"></i>
        </div>
        <div>
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img src={restaurant.thumb} className="gallery_img" alt=" " />
            </div>
          </Carousel>
        </div>
      </Modal>

      <Modal isOpen={menuModal} style={customStyles}>
        <div onClick={() => handleModal("menuModal", false)} className="close">
          <i className="bi bi-x-lg"></i>
        </div>
        <div>
          <h3 className="menu_restaurant_name" style={{ fontWeight: "bold" }}>
            {restaurant.name}
          </h3>
          {menu?.map((item, index) => (
            <div className="menu" key={index}>
              <div className="menu_body">
                <h5 className="font_weight">{item.name}</h5>
                <h5 className="font_weight">₹ {item.price}</h5>
                <p className="item_details">{item.description}</p>
              </div>
              <div className="menu_image">
                <img
                  className="item_image"
                  src={`./images/${item.image}`}
                  alt="food"
                />
                {item.qty === 0 ? (
                  <div
                    className="item_quantity_button"
                    onClick={() => addItems(index, "add")}
                  >
                    ADD
                  </div>
                ) : (
                  <div className="item_quantity_button">
                    <button onClick={() => addItems(index, "sub")}>-</button>
                    <span className="qty"> {item.qty} </span>
                    <button
                      onClick={() => addItems(index, "add")}
                      style={{ color: "#61B246" }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="payment">
            <h4 className="total font_weight">Subtotal: ₹ {subtotal || 0}</h4>
            <button
              className="btn btn-danger payment_button"
              onClick={() => {
                handleModal("menuModal", false);
                handleModal("formModal", true);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={formModal} style={customStyles}>
        <div onClick={() => handleModal("formModal", false)} className="close">
          <i className="bi bi-x-lg"></i>
        </div>
        <div style={{ width: "20em" }}>
          <h3 className="menu_restaurant_name">{restaurant.name}</h3>

          <label htmlFor="name" style={{ marginTop: "10px" }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            style={{ width: "100%" }}
            className="form-control"
            id="name"
          />

          <label htmlFor="mobile" style={{ marginTop: "10px" }}>
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="Enter mobile number"
            style={{ width: "100%" }}
            className="form-control"
            id="mobile"
          />

          <label htmlFor="address" style={{ marginTop: "10px" }}>
            Address
          </label>
          <textarea
            type="text"
            rows="4"
            placeholder="Enter your address"
            style={{ width: "100%" }}
            className="form-control"
            id="address"
          ></textarea>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary "
              style={{ float: "right", marginTop: "18px" }}
              onClick={razorpayPayment}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                alt="razorpay"
                style={{ height: "25px" }}
              />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Details;

//////////////////////////
