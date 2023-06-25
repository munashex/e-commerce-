import express from 'express' 
const OrderRoute = express.Router()  
import Order from '../model/orderModel.js'
import { isAuth } from '../utils.js'


OrderRoute.post('/',isAuth, async(req, res) => {
const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
})
const order = await newOrder.save() 
res.status(201).send({message: 'New Order Created', order})
})

  
OrderRoute.get("/:id", isAuth, async(req, res) => {
const order = await Order.findById(req.params.id) 
if(order) {
    res.send(order)
}else {
    res.status(404).send({message: 'Order Not Found'})
}
})

OrderRoute.put(
    '/:id/pay',
    isAuth,
    async(req, res) => {
      const order = await Order.findById(req.params.id)
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
        };
  
        const updatedOrder = await order.save();
        
  
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  

export default OrderRoute