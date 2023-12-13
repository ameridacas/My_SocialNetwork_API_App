const connection = require('../config/connection');
const { User, Thought } = require('../models');

const getRandomUser = (user) => {
    const randomUser = getRandomUser(); 
    console.log(randomUser); // log the random user
    return '';
};

getRandomUser();

const getRandomThoughts = () => {
    const randomThoughts = getRandomThoughts();
    console.log(randomThoughts); // log the random thoughts
    return [];
};

connection.once('open', async () => {
    // Delete existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Generate users
    const users = [];
    for (let i = 0; i < 20; i++) {
        users.push({
            username: `user${i}`,
            email: `user${i}@example.com`,
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

    // Insert thoughts
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});

