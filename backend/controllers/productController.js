import AsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
//@desc fetch all products
//@route GET/api/products
//@access Public route
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//@desc fetch single products
//@route GET/api/products/:id
//@access Public route
const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    //custom error handler:
    res.status(404) // if we don't set it to 404 it would be 500 by default
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
