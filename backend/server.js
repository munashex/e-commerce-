import express from 'express' 
import cors from 'cors' 
import dotenv from 'dotenv' 
dotenv.config()
import {ConnectDB} from './config/db.js'   
ConnectDB()
import seedRouter from './routes/seedRoutes.js' 
import ProductRoute from './routes/Product.js' 
import userRoute from './routes/UserRoute.js'


const app = express()   
app.use(express.json())  
app.use(express.urlencoded({extended: true}))  
app.use(cors())

app.use('/api/seed', seedRouter) 
app.use('/api/products', ProductRoute)  
app.use('/api/users', userRoute)





app.listen(3000, () => console.log('server is running on port 3000'))