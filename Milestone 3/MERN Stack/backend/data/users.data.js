const faker = require('faker');

let usersData = [ {
    email: "frank@mail.com",
    fullName: "Frank Schulz",
    password: "Password123",
}, ];

for (let i = 0; i < 10; i++) {
    usersData.push({
        email: faker.internet.email(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        password: faker.internet.password(),
        
    });
};

module.exports = usersData;
