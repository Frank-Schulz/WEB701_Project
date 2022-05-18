const faker = require('faker');
const Products = require('../models/products.model');

const genData = async () => {
  let productIDs = [];
  let ordersData = [];

  let products = [];

  products = await Products.find({})

  products.forEach(product => {
    productIDs.push(product.id);
  })

  for (var i = 0; i < 10; i++) {
    ordersData.push({
      id: faker.datatype.uuid(),
      productID: productIDs[ Math.floor(Math.random() * productIDs.length) ],
      completed: Math.floor(Math.random() + 0.5),
    });
  };
  return ordersData;
}

module.exports = genData();
