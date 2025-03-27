require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Schema (Matching Required Format)
const noiseSchema = new mongoose.Schema({
    City: { type: String, required: true },
    Place: { type: String, required: true },
    "Noise level(dB)": { type: Number, required: true },
    Category: { type: String, required: true }
  }
  , { collection: 'NoiseCollection' });

const NoiseReport = mongoose.model("NoiseReport", noiseSchema);

// API Endpoint to receive noise reports
app.post("/api/noise/report", async (req, res) => {
  try {
    const { city, place, noise_level, category } = req.body;

    // Ensure only the required fields are stored
    const newReport = new NoiseReport({
      City: city,
      Place: place,
      "Noise level(dB)": noise_level,
      Category: category,
    });

    await newReport.save();
    res.status(201).json({ message: "Noise data saved successfully!" });
  } catch (error) {
    console.error("Error saving noise data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
