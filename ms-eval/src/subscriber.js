
const amqp = require('amqplib/callback_api')
const Admin = require("./models/Admin")
const {ObjectId} = require('mongodb')
const express = require('express')
const Evaluateur = require('./models/Evaluateur')

do_consume()
async function do_consume() {
    amqp.connect(`amqp://localhost`,(err, connection) => {
        if(err) {
            throw err
        }
        connection.createChannel((err, channel) => {
            if(err) {
                throw err
            }
            let queueName = "kawthar"
            channel.assertQueue(queueName, {
                durable: false
            })
            channel.consume(queueName,async(msg) => {
              const buffer = Buffer.from(msg.content).toString()
              const bufferObject = JSON.parse(buffer)
              if (bufferObject.propertie === "post") {
                const admin = await new Admin()
                admin.idAdmin = bufferObject.message._id
                admin.tokens[0] ={token : bufferObject.token}
                await admin.save()
                channel.ack(msg)
              }
              if (bufferObject.propertie === "postevaluateur") {
                const evaluateur = await new Evaluateur()
                evaluateur.idEvaluateur = bufferObject.message._id
                evaluateur.tokens[0] ={token : bufferObject.token}
                await evaluateur.save()
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

              }
              if(bufferObject.propertie === "deleteeva"){
                await Evaluateur.findOneAndDelete({ idEvaluateur : bufferObject.message}).exec()
                channel.ack(msg)

              }

            })
        })
    })
}

module.exports = do_consume
/*
const express = require("express")
const amqp = require('amqplib')
const router = new express.Router()

var channel,connection
connect()
async function connect() {
  try{
    const amqpServer = "amqp://localhost"
    connection = await amqp.connect(amqpServer)
    channel = await connection.createChannel()
    await channel.assertQueue("rabbit")
    channel.consume("rabbit", data => {
      console.log(`Receives ${Buffer.from(data.content)}`)
      channel.ack(data)
    })
  }catch(err) {
    console.log(err);
  }
}
module.exports = connect
*/