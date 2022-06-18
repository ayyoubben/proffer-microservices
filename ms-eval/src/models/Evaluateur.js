const mongoose = require('mongoose')

const evaluateurSchema = new mongoose.Schema({
    idEvaluateur: {
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

const Evaluateur = mongoose.model('Evaluateur', evaluateurSchema)

module.exports = Evaluateur