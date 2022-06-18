
const amqp = require('amqplib/callback_api')
const msg = {
  message: {},
  propertie: ""
}
async function produce(msg) {
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
            channel.sendToQueue(queueName, Buffer.from(Buffer.from(JSON.stringify(msg))))
            console.log(`message :${msg.message} `);
            setTimeout(() => {
                connection.close()
            }, 1000);
        })
    })
}


module.exports = produce
/*
const express = require("express")
const amqp = require('amqplib')
const router = new express.Router()
var channel,connection
connect()
const fakeData = {
    name: "kawthar",
    company: "Spacex"
  }
async function connect(fakeData) {
  try{
    const amqpServer = "amqp://localhost"
    connection = await amqp.connect(amqpServer)
    channel = await connection.createChannel()
    await channel.assertQueue("rabbit")
  }catch(err) {
    console.log(err);
  }
}
router.get("/send",async (req,res) => {

  await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(fakeData)))
  //await channel.close()
  //await connection.close()
  return res.send("done")
})
module.exports = router
*/