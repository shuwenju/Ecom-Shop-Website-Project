import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async() =>{
    try{ // clear everything before import
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users) // this will be array of created users
        const adminUser = createdUser[0]._id
        const sampleProucts = products.map(product =>{
            return{ ...product, user: adminUser } // add a user field to each product in products.js
        })
        await Product.insertMany(sampleProucts)
        console.log('data imported!'.green.inverse)
        process.exit()
    } catch(err){
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async() =>{
    try{ // clear everything before import
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

    
        console.log('data destroyed!'.red.inverse)
        process.exit()
    } catch(err){
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}
// process.argv[2] // to get the -d in terminal node backend/seeder -d
if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}