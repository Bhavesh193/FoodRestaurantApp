import React, { useState } from "react";
import Modal from "react-modal";

// const BASE_URL = "http://localhost:5500";
const BASE_URL = window.env.REACT_APP_BASE_URL;

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

const Header = ({ user }) => {
  const [loginModal, setLoginModal] = useState(false);

  const handleModal = (value) => {
    setLoginModal(value);
  };

  const google = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  const logout = () => {
    window.open(`${BASE_URL}/auth/logout`, "_self");
  };

  return (
    <div>
      <div className="position-absolute end-0 me-5 z-3 pb-5">
        {!user ? (
          <form className="d-flex nav-form">
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => handleModal(true)}
            >
              Create an account
            </button>
          </form>
        ) : (
          <form className="d-flex nav-form">
            {/* {console.log("user.photos[0].value", user.photos[0].value)} */}
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#eb4d4b",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "6px",
                  fontSize: "1.5rem",
                }}
              >
                {user.displayName.charAt(0)}
              </div>
            </div>
            {/* {user.photos[0].value ? (
              <img src={user.photos[0].value} className="circle" alt="User" />
            ) : (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "gray",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignContent: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "8px",
                    fontSize: "1.5rem",
                  }}
                >
                  {user.displayName.charAt(0)}
                </div>
              </div>
            )} */}
            {/* // <img src={user.photos[0].value} className="circle" alt="User" /> */}
            <p className="text-white m-3">{user.displayName}</p>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={logout}
            >
              Logout
            </button>
          </form>
        )}

        <Modal isOpen={loginModal} style={customStyles}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 style={{ color: "#192F60", fontWeight: "bold" }}>Login</h4>
              <div
                onClick={() => handleModal(false)}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-x-lg h2"></i>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={google}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #E0E0E0",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  color: "#D54A41",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://pngimg.com/d/google_PNG19635.png"
                  alt="Google"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                  }}
                />
                Continue with Gmail
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
