const seedUsers = require('./seedUsers')
const seedProducts = require('./seedProducts')
const seedOrders = require('./seedOrders')
const seedTokens = require('./seedTokens')

// Caller for the various seeder functions
const seedAll = async () => {
    console.log("======= Seeding database with test data =======\n");

    await seedUsers();
    await seedProducts();
    await seedOrders();
    await seedTokens();

    console.log("\n========= Data seeded successfully! =========");
}

module.exports = seedAll;
