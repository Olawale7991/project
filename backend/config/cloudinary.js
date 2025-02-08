import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    try {
         cloudinary.config({
            cloud_name: process.env.cloudinary_Name,
            api_key: process.env.cloudinary_API_KEY,
            api_secret: process.env.cloudinary_Secret_Key,
        })
        console.log('Cloudinary Connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectCloudinary;