const faker = require('faker');

let usersData = [ {
    email: "admin@example.com",
    password: "Password123",
    type: "member",
    fullName: "Frank Schulz",
    DoB: "11/09/1999",
    registrationDate: faker.date.past(),
    vouchers: 8,
}, ];

for (let i = 0; i < 10; i++) {
    usersData.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        type: "member" || "beneficiary",
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        DoB: faker.date.past(),
        registrationDate: faker.date.past(),
        vouchers: faker.random.number({min: 0, max:8}),
    });
};

module.exports = usersData;
