const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsers, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    // Delete existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Generate users
    const users = [];
    for (let i = 0; i < 20; i++) {
        users.push({
            username: getRandomUsers(),
            thoughts: getRandomThoughts(),
            friends: [],
        });
    }

    // Insert users
    await User.insertMany(users);

    // Generate and insert thoughts
    const thoughts = [];
    for (let i = 0; i < 50; i++) {
        thoughts.push({
            thoughtText: `Thought ${i}`,
            username: users[Math.floor(Math.random() * users.length)].username,
        });
    }

    await User.updateMany(users);
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});

