const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    idAdmin: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    tokens: [{
        token: {
            type: String
        }
    }],
},
{
    timestamps: true
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin