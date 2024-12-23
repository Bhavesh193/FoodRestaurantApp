const User = require("../Model/userDB");

exports.postSignUp = (req, res) => {
  const { email, password, name } = req.body;

  const userObj = new User({
    email,
    password,
    name,
  });

  // This only creates an instance of the object in memory. The object is not yet saved in the database. The userObj.save() method is what triggers the actual database operation to persist this object in MongoDB.
  userObj
    .save()
    .then((response) => {
      res.status(200).json({
        message: "User Details Saved Successfully",
        signup: response,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.postlogin = (req, res) => {
  const { email, password } = req.body;

  User.find({
    email,
    password,
  })
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json({
          message: "User Details Fetched Successfully",
          login: response,
          isAuthenticated: true,
        });
      } else {
        res.status(200).json({
          message: "User Details Not Found",
          login: response,
          isAuthenticated: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
