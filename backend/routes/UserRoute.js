import express from 'express' 
const userRoute = express.Router() 
import User from '../model/userModel.js' 
import bcrypt from 'bcryptjs' 
import { generateToken } from '../utils.js'


userRoute.post(
    '/signin',
    async(req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })

   

    userRoute.post('/signup', async(req, res) => { 
      const {name, email, password} = req.body 

      const userEmail = await User.findOne({email: email}) 

      if(userEmail) {
        res.status(401).send({message: 'User exists'}) 
        return
      } 

      const salt = await bcrypt.genSalt(12) 
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = await User.create({
        name: name, 
        email: email, 
        password: hashedPassword
      }) 

      res.status(200).send({
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin, 
        token: generateToken(user)
      })
    })
  


export default userRoute