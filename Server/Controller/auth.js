const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://foodrestaurantapp-1.onrender.com";
// const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Successful",
      user: req.user,
    });
  }
});

router.get("/login/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://foodrestaurantapp-1.onrender.com");
  // res.redirect("http://localhost:3000");
});

// This route starts the Google login process.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// This route handles the response from Google after the user logs in.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failure",
  })
);

module.exports = router;
