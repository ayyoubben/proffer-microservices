const mongoose = require('mongoose')

const barremSchema = new mongoose.Schema({
    classification: {
        type: String,
        required: false,
    },
    nbMateriels: {
        type: Number,
        required: false,
    },
    nbSalariés: {
        type: Number,
        required: false,
    },
    prix: {
        type: Number,
        required: false,
    },
    dernierDelai: {
        type: Number,
        required: false,
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Offre"
    },
    
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Lot"
    },
    
},
{
    timestamps: true
})

const Barrem = mongoose.model('Barrem', barremSchema)

module.exports = Barrem