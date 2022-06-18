
const amqp = require('amqplib/callback_api')
const msg = {
  message: {},
  propertie: ""
}
async function produceManel(msg) {
    amqp.connect(`amqp://localhost`,(err, connection) => {
        if(err) {
            throw err
        }
        connection.createChannel((err, channel) => {
            if(err) {
                throw err
            }
            let queueName = "manelayyoub"
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


module.exports = produceManel
