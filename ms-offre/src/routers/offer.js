const express = require('express')
const { off } = require('../models/offer')
const router = express.Router()
const Offer = require('../models/offer')
// const multer = require('multer')
// const Sharp = require('sharp')
const producemanel = require('../publishermanel')

router.post('/offre/offers/add', async (req,res) => {
    const offer = new Offer({
        ...req.body,
        //owner: req.admin._id
    
    })

    try{
        await offer.save()
        producemanel({message: offer, propertie: "postoffre"})
        res.status(201).send(offer)

    } catch(e) {
        res.status(400).send(e)
	console.log(e)
    }
})

//GET /offers?limit=10&skip=20
//GET /offers?sortBy=createdAt_asc
router.get('/offre/offers',async (req,res) => {
    /*const sort = {}

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }*/

    try{
        //const lots = await Lot.find({})
        /*await req.admin.populate({
            path: 'offers',
            options: {
                limit : parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()*/
        const offers = await Offer.find({})
        res.send(offers)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/offre/offers/:id', async (req,res) =>{
    const _id = req.params.id
    try{
        // const offer = await Offer.findById(req.params.id)
        const offer = await Offer.findOne({_id, owner: req.admin._id})
        if(!offer) {
            return res.status(404).send()
        }

        res.send(offer)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/offre/offers/edit/:id',  async(req,res) =>{
    updates = Object.keys(req.body)
    allowedUpdates = ['name','dDay']
    isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate) {
        res.status(400).send({error: 'unvalid update!'})
    }
    try {
        //const offer = await Offer.findById(req.params.id)
        const offer = await Offer.findOne({ _id: req.params.id, owner: req.admin._id })
        if (!offer) {
            return res.status(404).send()
        }
        updates.forEach((update) => offer[update] = req.body[update]);
        await offer.save()
        producemanel({message: offer, propertie: "patchoffre"})

        res.send(offer)

    } catch (e) {
        res.status(400).send()
        
    }
})

router.delete('/offre/offers/delete/:id', async(req,res) => {
    try {
        //const offer = await Offer.findByIdAndDelete(req.params.id)
        const offer = await Offer.findOneAndDelete({ _id: req.params.id})
        
        if(!offer) {
            return res.status(404).send()
        }
        producemanel({message: req.params.id, propertie: "deleteoffre"})
        return res.send(offer)
        
       

    } catch (error) {
        res.status(500).send()
    }
    
})



module.exports = router
