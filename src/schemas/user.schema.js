const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			sparse: true
		},
		password: {
			type: String
		},
		name: {
			type: String,
		},
		surname: {
			type: String,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

module.exports = mongoose.model('User', UserSchema);