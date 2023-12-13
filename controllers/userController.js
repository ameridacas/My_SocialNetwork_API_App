const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({}).populate('thoughts').populate('friends');
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
            
            await Thought.deleteMany({ _id: user.thoughts });
            res.json({ message: 'User and associated thoughts deleted' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};