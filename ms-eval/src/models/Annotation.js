const mongoose = require('mongoose')

const AnnotationSchema = new mongoose.Schema({
    classification: {
        type: Number,
        required: false,
    },
    nb_materiel: {
        type: Number,
        required: false,
    },
    nb_salaries: {
        type: Number,
        required: false,
    },
    qualite_tech: {
        type: Number,
        required: false,
    },
    prix: {
        type: Number,
        required: false,
    },
    delai: {
        type: Number,
        required: false,
    },
    soumission: {
        type: Number,
        required: true,
        ref: "Soumission"
    },
    offre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Offre"
    },
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Lot"
    },
    state: {
        type: String,
        required: true,
        default: "in progress"
    }
    
},
{
    timestamps: true
})

const Annotation = mongoose.model('Annotation', AnnotationSchema)

module.exports = Annotation