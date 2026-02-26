import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
        unique: true,
		lowercase: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
