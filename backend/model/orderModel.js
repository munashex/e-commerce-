import mongoose from 'mongoose' 


const OrderSchema = new mongoose.Schema({

}, {timestamps: true}) 


const Order = mongoose.model('Order', OrderSchema) 
export default Order