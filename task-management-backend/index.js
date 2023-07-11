const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const database = require("./database/mysql");
require("dotenv").config();
const app = express();

//initialise database
database.createTables();

// set port, listen for requests
const PORT = process.env.PORT || 8085;

// cors fix
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// routes
require("./routes/user.routes")(app);
require("./routes/task.routes")(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
