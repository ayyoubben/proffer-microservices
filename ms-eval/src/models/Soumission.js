const mongoose = require('mongoose')

const soumissionSchema = new mongoose.Schema({
    idSoumission: {
        type: String
    },
    classification: {
        type: String,
    },
    nbMateriel: {
        type: Number,
    },
    nbSalarie: {
        type: Number,
    },
    prix: {
        type: String,
    },
    offre: {
        type: mongoose.Schema.Types.ObjectId,
    },
    
    lot: {
        type: mongoose.Schema.Types.ObjectId,
    },
    soumissionnaire: {
        type: mongoose.Schema.Types.ObjectId,
    },
    cahierCharge: {
        type: String
    },
    extraitRole:{
        type: String 
    },

    delai: {
        type: Date
    },
    nCnas: {
        type: Number
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

const Soumission = mongoose.model('Soumission', soumissionSchema)

module.exports = Soumission
