import { v2 as cloudinary } from 'cloudinary'

const cloudinaryConnect = () => {
  try{

    cloudinary.config({ 
     cloud_name: process.env.CLOUD_NAME, 
     api_key: process.env.API_KEY, 
     api_secret: process.env.API_SECRET
   });

   console.log("connected to cloudinary")

  }catch(err){
    console.log('error in connecting to cloudinary ' , err)
  }
}
export default cloudinaryConnect;