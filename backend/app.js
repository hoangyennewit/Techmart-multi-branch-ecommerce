const express = require("express");
const upload = require("./src/middlewares/uploadCloud");

const app = express();

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      imageUrl: req.file.path, // URL từ Cloudinary
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server chạy"));