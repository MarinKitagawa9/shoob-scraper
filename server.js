const express = require("express");
const { scrapeShoobCards } = require("./index");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Shoob Scraper Alive");
});

app.post("/run", async (req, res) => {
  try {
    const data = await scrapeShoobCards();
    res.json({
      success: true,
      total: data.length,
      cards: data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("🚀 Scraper running on port", PORT)
);
