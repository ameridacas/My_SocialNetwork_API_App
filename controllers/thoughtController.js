const { Thought, Reaction } = require('../models');

module.exports = {
    getThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getSingleThought: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions');
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Thought deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: reaction._id } },
                { new: true }
            );
            res.json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });
            await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: reaction._id } },
                { new: true }
            );
            res.json({ message: 'Reaction deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};


