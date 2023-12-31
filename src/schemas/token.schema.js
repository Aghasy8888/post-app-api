'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;
const auth = require('../../config/auth.config');
const ObjectId = Schema.ObjectId;

const TokenSchema = new Schema(
    {
        owner: {
            type: ObjectId,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        jwt: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)
.index(
    {'created_at': 1},
    {expireAfterSeconds: auth.jwt.exp}
);

module.exports = mongoose.model('Token', TokenSchema);