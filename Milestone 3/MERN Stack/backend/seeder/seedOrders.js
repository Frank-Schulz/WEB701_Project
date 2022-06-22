const ordersData = require("../data/orders.data")
const Orders = require("../models/orders.model")

// Seeder function for orders
const seedOrders = async () => {
    console.log("Seeding order data...");
    try {
        await Orders.deleteMany()
        await Orders.insertMany(await ordersData)

        console.log("Orders seeded successfully!\n");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = seedOrders;
