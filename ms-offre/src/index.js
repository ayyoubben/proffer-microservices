const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const lotRouter = require('./routers/lot')
const offerRouter = require('./routers/offer')
const barremRouter = require('./routers/barrem')
const subscriberayyoub = require('./subscriberayyoub')

const app = express()

app.use(express.json())
app.use(cors())
app.use(offerRouter)
app.use(lotRouter)
app.use(barremRouter)
app.use(subscriberayyoub)
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
