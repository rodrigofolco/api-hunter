const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const mongooseTimestamp = require('mongoose-timestamp');
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['ADMIN', 'SUBSCRIBER'], uppercase: true }
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    });
})

UserSchema.plugin(mongooseDelete, { overrideMethods: true });
UserSchema.plugin(mongooseTimestamp);

module.exports = mongoose.model('User', UserSchema);