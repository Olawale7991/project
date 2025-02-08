import express from 'express'
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe, } from '../controllers/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'


const orderRouter = express.Router()

//admin features API
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)


//payment features
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)


//user features
orderRouter.post('/userorders',authUser, userOrders)

//verify stripe payment

orderRouter.post('/verifyStripe', authUser, verifyStripe)


export default orderRouter
