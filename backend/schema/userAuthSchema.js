const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const UserAuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email address already used']
    },
    password: {
        type: String,
        required: true
    },
    refreshTokens: []
})


UserAuthSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    const encryptedPass = await bcrypt.hash(this.password, 12);
    this.password = encryptedPass;

    next();

})


module.exports = mongoose.model('User', UserAuthSchema);