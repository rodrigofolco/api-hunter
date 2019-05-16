const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const mongooseTimestamp = require('mongoose-timestamp');

const UserSchema = new Schema({
    owner: { type: mongoose.Schema.ObjectId, required: true },
    bond: { type: String, required: true, ref: 'User' }
});

UserSchema.plugin(mongooseDelete, { overrideMethods: true });
UserSchema.plugin(mongooseTimestamp);

module.exports = mongoose.model('Bond', UserSchema);