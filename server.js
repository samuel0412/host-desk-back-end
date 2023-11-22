require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6000;
var corsOptions = { origin: "*" };

app.use(cors(corsOptions));

app.use(express.json());

require("./routes/index.routes")(app);
require("./routes/contactUs.routes")(app);
require("./routes/account.routes")(app);
require("./routes/day.routes")(app);

app.listen(port, () => {
  console.log(`server is listening to the port:${port}`);
});
