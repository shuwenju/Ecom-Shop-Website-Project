/*
Importing the Express framework which is a popular Node.js web application framework.
Importing an array of product data from a separate file located at ./data/products.js.
Creates an instance of the Express application:
This app instance can be used to define routes, middleware, and other functionality to handle HTTP requests and responses.
*/

/*
dotenv is a zero-dependency npm package that loads environment variables from a .env file into a Node.js application's 
process.env object. This allows developers to keep sensitive information such as API keys, passwords, 
and other environment-specific configuration separate from the codebase and safely stored in a 
configuration file.
See now you don't have to hard code port
*/

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()
const app = express()

app.use(express.json())

// app.use((req, res, next) => {
//   console.log('helow')
//   next() // you always have call next() to get to the next middleware, now you call api on postman, you get hellow showing in console.
// })

//create a route
app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//we also want a fallback for 404 errors: anything thats not found:
app.use(notFound)

//if you want to custom error you put in err as a param first
app.use(errorHandler)

//get all the products as json from product.js
app.get('/api/products', (req, res) => {
  //res.send/json will convert it to json type even tho its js objects
  res.json(products)
})

//get single product by id:
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
