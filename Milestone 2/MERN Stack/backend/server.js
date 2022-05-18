// Require
const express = require("express");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/error.middleware')
require("dotenv").config();

// Connect to the database
require("./config/db.config")();

const app = express();

// Include session to application
require("./config/session.config.js")(app);

/* ------------------------------- ANCHOR Get Routes ------------------------------- */
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const tokenRoutes = require("./routes/token.routes");
const { token } = require("morgan");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

/* --------------------------------- ANCHOR Routes -------------------------------- */

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/tokens', tokenRoutes);

app.use(notFound);
app.use(errorHandler);


/* ---------------------------------- ANCHOR Start --------------------------------- */

const {
  PORT,
} = process.env;

app.listen(PORT, () => {
  console.log(`Started on port: ${PORT}`);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(5000).then(() => {
  // Seed the database
  const seedAll = require("./seeder/seedAll");
  // seedAll();
}
)
