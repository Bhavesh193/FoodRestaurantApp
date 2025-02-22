const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");

const PORT = 5500;
// const PORT = process.env.PORT || 5500;
dotenv.config();

const paymentRoute = require("./Controller/payment");
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

const corsOptions = {
  origin: "https://foodrestaurantapp-1.onrender.com",
  // origin: "http://localhost:3000",
  // origin: process.env.REACT_URL,
  methods: "GET,POST,PUT,DELETE, PATCH",
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders:
    "X-Requested-With,content-type, x-token, Access-Control-Allow-Credentials",
};

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["edureka"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.options("*", cors());
app.use("/", route);
app.use("/api/payment/", paymentRoute); // Razorpay
app.use("/auth", authRoute);

// DB
// const MongoAtlas = process.env.MONGO_URL;
const MongoAtlas =
  "mongodb+srv://bhaveshchoudhary2025:rU8RGrpUnugdYtRo@cluster0.lcazl.mongodb.net/ZomatoClone?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MongoAtlas, {})
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
