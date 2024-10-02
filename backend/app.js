const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

const mtgRoutes = require("./routes/mtg");
app.use("/mtg", mtgRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
