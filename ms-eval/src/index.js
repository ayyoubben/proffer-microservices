const express = require("express");
require("./db/db_connection")


const AnnotationRouter = require('./routers/Annotation')
const subscriber = require('./subscriber')
const subscriberhafsa = require('./subscriberhafsa')
const subscribermanel = require('./subscribermanel')
const app = express();
app.use(express.json()) 
app.use(AnnotationRouter)
app.use(subscriber)
app.use(subscriberhafsa)
app.use(subscribermanel)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})