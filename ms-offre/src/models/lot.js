const mongoose = require('mongoose')
//const validator = require('validator')


const lotSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classification: {
        type: String
    },
    nbMateriels: {
        type: Number,
        trim: true,
        required: true
    },
    nbSalariés: {
        type: Number,
        trim: true,
        required: true
    },
    dernierDelai: {
        type: Number,
        required: true 
    },
    type: {
        type: String,
        required: true
    },
    cahierDesCharges: {
        type: String,
      
    },
    /*prixMin: {
        type: Number,
        trim: true,
        required: true
    },
    prixMax: {
        type: Number, 
        trim: true,
        required: true
    },*/
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Offer'
    }
})

lotSchema.virtual('barrem', {
    ref: 'Barrem',
    localField: '_id',
    foreignField: 'lot'
})



lotSchema.methods.toJSON = function() {
    const lot = this
    const lotObject = lot.toObject()
    /*delete lotObject.prixMin
    delete lotObject.prixMax*/

    return lotObject 

}

const Lot = mongoose.model('Lot', lotSchema )

module.exports = Lot
