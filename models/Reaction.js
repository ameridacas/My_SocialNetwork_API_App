const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction is required.',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is required.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => createdAtVal
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

module.exports = reactionSchema;

