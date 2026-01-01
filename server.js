const express = require("express");
const { scrapeShoobCards } = require("./index");

const app = express();
app.use(express.json());

let isRunning = false;

app.get("/", (req, res) => {
  res.send("Shoob Scraper Alive");
});

// 🔥 NON-BLOCKING RUN
app.post("/run", (req, res) => {
  if (isRunning) {
    return res.json({ status: "already running" });
  }

  isRunning = true;
  res.json({ status: "started" });

  (async () => {
    try {
      console.log("🚀 Scraper started");
      await scrapeShoobCards();
      console.log("✅ Scraper finished");
    } catch (err) {
      console.error("❌ Scraper error:", err);
    } finally {
      isRunning = false;
    }
  })();
});

app.get("/status", (req, res) => {
  res.json({
    running: isRunning
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("🚀 Server running on port", PORT)
);
