const passport = require("passport");

var GoogleStrategy = require("passport-google-oauth2").Strategy;

// const CLIENT_ID = "";
// const CLIENT_SECRET = "";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://foodrestaurantapp.onrender.com/auth/google/callback",
      // callbackURL: "http://localhost:5500/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
