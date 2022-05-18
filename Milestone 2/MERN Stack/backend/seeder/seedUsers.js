const usersData = require("../data/users.data")
const Users = require("../models/users.model")

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Seeder function for users
const seedUsers = async () => {
    console.log("Seeding user data...");
    try {
        await Users.deleteMany()

        const userInsert = async (user) => { await Users.create(user) };

        usersData.forEach(user => {
            // First use bcrypt to hash incoming password
            bcrypt.hash(user.password, saltRounds)
                .then((hashedPassword) => {
                    user.password = hashedPassword
                    userInsert(user)
                })
        });

        console.log("Users seeded successfully!\n");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = seedUsers;
