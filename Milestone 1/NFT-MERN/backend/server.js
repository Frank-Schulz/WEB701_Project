const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();

const { notFound, errorHandler } = require('./middlewares/error.middleware')

// Connect to MongoDB
require("./config/db.config")();

const app = express();

/* ---------------------------- ANCHOR Get Routes --------------------------- */
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes");
const tokenRoutes = require("./routes/token.routes");
const userRoutes = require("./routes/user.routes");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------------- ANCHOR Use Routes --------------------------- */

app.use('/order', orderRoutes);
app.use('/product', productRoutes);
app.use('/token', tokenRoutes);
app.use('/user', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send("API is running");
});

const { PORT, } = process.env;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
});
