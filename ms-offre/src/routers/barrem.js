const express = require('express')
const router = express.Router()
const Barrem = require("../models/barrem")
const producekawthar = require('../publisherkawthar')

//create
router.post('/offre/barrems/add', async (req, res) => {
    const barrem = new Barrem({
        ...req.body
    })

    try {
        await barrem.save()
        producekawthar({message: barrem, propertie: "postBarrem"})
        res.status(201).send(barrem)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})
//get_all
router.get('/offre/offers/barrems', async (req, res) => {
    try {
        const barrems = await Barrem.find({})
        if(!barrems) {
            throw new Error()
        }
        res.send(barrems)
    } catch (e) {
        res.status(404).send()
    }
})
//get_by_id
router.get('/offre/offers/barrems/:id', async (req, res) => {
    try {
        const barrem = await Barrem.findById(req.params.id)
        
        if(!barrem) {
            throw new Error()
        }
        res.send(barrem)
    } catch (e) {
        res.status(404).send()
    }
})

//get_id_offre
router.get('/offre/offers/barrems/offre/:id', async (req, res) => {
    const offre = req.params.id
    try {
        const barrem = await Barrem.findOne({offre})
        
        if(!barrem) {
            throw new Error()
        }
        res.send(barrem)
    } catch (e) {
        res.status(404).send()
    }
})
//get_by_id_lot
router.get('/offre/offers/barrems/lot/:id', async (req, res) => {
    const lot = req.params.id
    try {
        const barrem = await Barrem.findOne({lot})
        console.log(lot)
        console.log(barrem)
        
        if(!barrem) {
            throw new Error()
        }
        res.send(barrem)
    } catch (e) {
        res.status(404).send()
    }
})

router.patch('/offre/offers/barrems/edit/:id', async(req,res) =>{
    updates = Object.keys(req.body)
    allowedUpdates = ['classification', 'nb_materiel', 'nb_salaries', 'prix']
    isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate) {
        res.status(400).send({error: 'unvalid update!'})
    }
    try {

        const barrem = await Barrem.findById({ _id: req.params.id })
        if (!barrem) {
            return res.status(404).send()
        }

        updates.forEach((update) => barrem[update] = req.body[update]);
        await barrem.save()
        producekawthar({message: barrem, propertie: "postBarrem"})

        res.send(barrem)

    } catch (e) {
        res.status(400).send()
        
    }
})

router.delete('/offre/offers/barrems/delete/:id', async(req,res) => {
    const _id = req.params.id
    try {
        const barrem = await Barrem.findOneAndDelete({ _id})
        producekawthar({message: _id, propertie: "deleteBarrem"})
        if(!barrem) {
            return res.status(404).send()
        }
        return res.send(barrem)
        

    } catch (error) {
        res.status(500).send()
    }
    
})

module.exports = router
