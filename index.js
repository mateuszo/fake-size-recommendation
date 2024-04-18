const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const sizeData = {
  XS: {
    neck: { min: 34.29, max: 38.1 },
    chest: { min: 66.04, max: 96.52 },
    sleeve: { min: 81.28, max: 85.09 },
  },
  S: {
    neck: { min: 35.56, max: 39.37 },
    chest: { min: 96.52, max: 101.6 },
    sleeve: { min: 83.82, max: 87.63 },
  },
  M: {
    neck: { min: 36.83, max: 40.64 },
    chest: { min: 101.6, max: 106.68 },
    sleeve: { min: 86.36, max: 90.17 },
  },
  L: {
    neck: { min: 38.1, max: 41.91 },
    chest: { min: 106.68, max: 111.76 },
    sleeve: { min: 88.9, max: 92.71 },
  },
  XL: {
    neck: { min: 39.37, max: 43.18 },
    chest: { min: 111.76, max: 116.84 },
    sleeve: { min: 91.44, max: 95.25 },
  },
  XXL: {
    neck: { min: 40.64, max: 44.45 },
    chest: { min: 116.84, max: 121.92 },
    sleeve: { min: 93.98, max: 97.79 },
  },
};

function getTshirtSize(neck, chest, sleeve) {
  const result = {};
  for (const size in sizeData) {
    result[size] = {
      neck: neck >= sizeData[size].neck.min && neck <= sizeData[size].neck.max,
      chest:
        chest >= sizeData[size].chest.min && chest <= sizeData[size].chest.max,
      sleeve:
        sleeve >= sizeData[size].sleeve.min &&
        sleeve <= sizeData[size].sleeve.max,
    };
  }
  return result;
}

app.post("/recommend-size", (req, res) => {
  const { neck, chest, sleeve } = req.body;

  const sizeRecommendation = getTshirtSize(neck, chest, sleeve);

  if (sizeRecommendation) {
    res.json({
      sizeRecommendation,
    });
  } else {
    res.json({ message: "Size not found based on your measurements." });
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));

module.exports = app;
