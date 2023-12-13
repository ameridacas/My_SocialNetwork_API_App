const possibleUsers = [
    {
    "id": 1,
    "username": "user1",
    "email": "user1@gmail.com"
    },
    {
    "id": 2,
    "username": "user2",
    "email": "user2@gmail.com"
    },
    {
    "id": 3,
    "username": "user3",
    "email": "user3@gmail.com"
    },
    {
    "id": 4,
    "username": "user4",
    "email": "user4@gmail.com"
    },
    {
    "id": 5,
    "username": "user5",
    "email": "user5@gmail.com"
    },
    {
    "id": 6,
    "username": "user6",
    "email": "user6@gmail.com"
    },
];
  
  const possibleReactions = [
    'Like',
    'Love',
    'Haha',
    'Wow',
    'Sad',
    'Angry',
  ];
  
  const possibleThoughts = [
    'This is a random thought.',
    'Another random thought here.',
    'Yet another thought for good measure.',
    'I am a thought.',
    'Thoughts are me.',
    'I think, therefore I am a thought.',
  ];
  
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Function to generate random thoughts
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(possibleThoughts),
        username: getRandomName(),
        reactions: [...getReactions(3)],
      });
    }
    return results;
  };
  
  // Function to generate random users 
  const getRandomUsers = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      const randomUser = getRandomArrItem(possibleUsers);
      results.push({
        username: randomUser.username,
        email: randomUser.email,
        thoughts: getRandomThoughts(5),
        friends: [],
      });
    }
    return results;
  };
  
  // Create the reactions that will be added to each thought
  const getReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(possibleReactions),
        username: getRandomName(),
      });
    }
    return results;
  };
  
  module.exports = { getRandomThoughts, getRandomUsers };
  