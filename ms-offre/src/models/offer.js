const { Double } = require('mongodb')
const mongoose = require('mongoose')
const Lot = require('./lot')


const offerSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dDay: {
        type: Date,
        required: true
    }
    /*owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    }*/

}, {
    timestamps: true
})


offerSchema.virtual('lots', {
    ref: 'Lot',
    localField: '_id',
    foreignField: 'offer'
})

// cascade delete
offerSchema.pre('remove', async function(next) {
    const offer = this 
    await Lot.deleteMany({offer: offer._id })



    next()
})

const Offer = mongoose.model('Offer', offerSchema )

module.exports = Offer
