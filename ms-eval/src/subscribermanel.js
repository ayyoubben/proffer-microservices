const amqp = require('amqplib/callback_api')
const express = require('express')
const Soumission = require('./models/Soumission')
var mongoose = require('mongoose');
do_consumemanel()
async function do_consumemanel() {
    amqp.connect(`amqp://localhost`,(err, connection) => {
        if(err) {
            throw err
        }
        connection.createChannel((err, channel) => {
            if(err) {
                throw err
            }
            let queueName = "manelkawthar"
            console.log(queueName)
            channel.assertQueue(queueName, {
                durable: false
            })
            channel.consume(queueName,async(msg) => {
              const buffer = Buffer.from(msg.content).toString()
              const bufferObject = JSON.parse(buffer)
              console.log(bufferObject)
              if (bufferObject.propertie === "postsoumission") {
                const soumission = await new Soumission()
                soumission.idSoumission = bufferObject.message.id
                soumission.classification = bufferObject.message.classification
                soumission.nbMateriel = bufferObject.message.nbMaterial
                soumission.nbSalarie = bufferObject.message.nbSlarie
                soumission.prix = bufferObject.message.prix
                soumission.offre = mongoose.Types.ObjectId(bufferObject.message.offre)
                soumission.lot = mongoose.Types.ObjectId(bufferObject.message.lot)
                soumission.delai = bufferObject.message.delai
                soumission.soumissionnaire = mongoose.Types.ObjectId(bufferObject.message.soumissionnaire)
                soumission.cahierCharge = bufferObject.message.cahierCharge
                soumission.extraitRole = bufferObject.message.extraitRole
                soumission.nCnas = bufferObject.message.nCnas
                await soumission.save()
                channel.ack(msg)
              }/*
              if (bufferObject.propertie === "patchBarrem") {
                const barrem =await  Barrem.findOne({ idBarrem: bufferObject.message._id}).exec() 
                barrem.classification = bufferObject.message.classification
                barrem.nb_materiel = bufferObject.message.nb_materiel
                barrem.nb_salaries = bufferObject.message.nb_salaries
                barrem.prix = bufferObject.message.prix
                barrem.offre = bufferObject.message.offre
                barrem.lot = bufferObject.message.lot
                await barrem.save()
                channel.ack(msg)
              }
              if (bufferObject.propertie === "postlogin"){
                const admin = await  Admin.findOne({ idAdmin: bufferObject.message._id}).exec()
                if(admin) {
                  if(admin.tokens){
                    admin.tokens.push({token: bufferObject.token})
                    await admin.save()
                  }
                  
                }
                channel.ack(msg)
              }
              if (bufferObject.propertie === "postevalogin"){
                const evaluateur = await  Evaluateur.findOne({ idEvaluateur: bufferObject.message._id}).exec()
                if(evaluateur) {
                  if(evaluateur.tokens){
                    evaluateur.tokens.push({token: bufferObject.token})
                    await evaluateur.save()
                  }
                  
                }
                channel.ack(msg)
              }
              if(bufferObject.propertie === "postlogout"){  

                const admin = await  Admin.findOne({ idAdmin: bufferObject.message._id}).exec()
                admin.tokens = admin.tokens.filter((token) => {
                  return token.token !== bufferObject.token
              })
              await admin.save()
              channel.ack(msg)

              }
              if(bufferObject.propertie === "postevalogout"){  
                console.log("hello");
                const evaluateur = await  Evaluateur.findOne({ idEvaluateur: bufferObject.message._id}).exec()
                evaluateur.tokens = evaluateur.tokens.filter((token) => {
                  return token.token !== bufferObject.token
              })
              await evaluateur.save()
              channel.ack(msg)
              }
              if(bufferObject.propertie === "delete"){
                await Admin.findOneAndDelete({ idAdmin : bufferObject.message}).exec()
                channel.ack(msg)

              }*/
              if(bufferObject.propertie === "deletesoumission"){
                await Soumission.findOneAndDelete({ idSoumission : bufferObject.message}).exec()
                channel.ack(msg)

              }

            })
        })
    })
}

module.exports = do_consumemanel
