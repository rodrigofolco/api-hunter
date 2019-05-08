const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const mongooseTimestamp = require('mongoose-timestamp');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['ADMIN', 'SUBSCRIBER'], uppercase: true }
});

UserSchema.plugin(mongooseDelete, { overrideMethods: true });
UserSchema.plugin(mongooseTimestamp);

module.exports = mongoose.model('User', UserSchema);