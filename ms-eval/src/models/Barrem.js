const mongoose = require('mongoose')

const BarremSchema = new mongoose.Schema({
    idBarrem: {
        type: String
    },
    classification: {
        type: String,
    },
    nb_materiel: {
        type: Number,
    },
    nb_salaries: {
        type: Number,
    },
    prix: {
        type: Number,
    },
    offre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offre"
    },
    
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lot"
    },
},
{
    timestamps: true
})

const Barrem = mongoose.model('Barrem', BarremSchema)

module.exports = Barrem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         