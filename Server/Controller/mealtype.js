const Mealtype = require("../Model/mealtypeDB");

exports.getMealtype = (req, res) => {
  Mealtype.find()
    .then((response) => {
      res.status(200).json({
        message: "Mealtype Fetched Successfully",
        meal: response,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getMealtypeById = (req, res) => {
  const { mealId } = req.params;

  Mealtype.find({ _id: Number(mealId) })
    .then((response) => {
      if (!response) {
        return res.status(404).json({
          message: "Mealtype not found for the given ID",
        });
      }
      res.status(200).json({
        message: "Meal By Id Fetched Successfully",
        mealtype: response,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Failed to fetch mealtype by ID. " + err.message });
    });
};
