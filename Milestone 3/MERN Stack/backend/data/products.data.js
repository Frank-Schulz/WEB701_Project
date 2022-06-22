const faker = require('faker');

let productsData = [];

for (var i = 0; i < 200; i++) {
    productsData.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        vouchers: Math.floor(Math.random() * 3 + 1),
        description: faker.commerce.productDescription(),
        imagePath: faker.image.imageUrl(),
        stock: Math.floor(Math.random() * 2 + 1),
    });
};

module.exports = productsData;
