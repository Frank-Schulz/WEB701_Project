const faker = require('faker');

let productsData = [];

for (var i = 0; i < 200; i++) {
    productsData.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        imagePath: faker.image.imageUrl(),
        stock: faker.datatype.number(1000),
    });
};

module.exports = productsData;
