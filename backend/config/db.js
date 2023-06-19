import mongoose from 'mongoose' 

export const ConnectDB = async() => {
    try {
     const connect = await mongoose.connect(process.env.MONGO_URI) 
     if(connect) {
        console.log('mongodb connect') 
        return
     }
    }catch(err) { 
        console.error(err)
        process.exit(1)
    }
} 
