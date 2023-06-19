import express from 'express' 
import Product from '../model/productModel.js'
const ProductRoute = express.Router()  


ProductRoute.get("/", async(req, res) => {
const products = await Product.find({}) 
if(!products) {
    res.status(404).send("No products available") 
    return 
} 
 
res.status(200).send(products)
}) 

ProductRoute.get('/slug/:slug', async(req, res) => {
    const product = await Product.findOne({slug: req.params.slug}) 


    if(product) {
        res.send(product)
    }else {
        res.status(404).send({message: 'Product Not Found'})
    }
})

ProductRoute.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id) 


    if(product) {
        res.send(product)
    }else {
        res.status(404).send({message: 'Product Not Found'})
    }
})

export default ProductRoute