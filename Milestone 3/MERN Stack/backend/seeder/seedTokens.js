const tokensData = require("../data/tokens.data")
const Tokens = require("../models/tokens.model")

// Seeder function for tokens
const seedTokens = async () => {
    console.log("Seeding token data...");
    try {
        await Tokens.deleteMany()
        await Tokens.insertMany(await tokensData)

        console.log("Tokens seeded successfully!\n");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = seedTokens;
