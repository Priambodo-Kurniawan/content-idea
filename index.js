if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes");
const errHandler = require("./middlewares/errHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(errHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// for serverless vercel
