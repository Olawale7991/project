import { v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';

//logic to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller} = req.body; 
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]       

        const images = [image1,image2,image3,image4].filter(item => item !== undefined)

        const imagesURL = await Promise.all(
            images.map(async (item)=> {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        )
    
        //add product to database
        const productData = {
            name, 
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller : bestSeller === 'true' ? true : false,
            sizes : JSON.parse(sizes),
            image : imagesURL,
            date : Date.now()

        }
        console.log(productData);
        const product = new productModel(productData)

        await product.save()
        res.json({success: true, message: 'product added successfully'})

    } catch (error) {
        console.log(error.stack);
        res.json({success:false, message:error.message})
        
    }

}


//logic to list a product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        res.json({success: true, products})
        
    } catch (error) {
        console.log(error.stack);
        res.json({success:false, message:error.message})
        
    }

}


//logic to remove a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: 'product removed successfully'})
    } catch (error) {
        console.log(error.stack);
        res.json({success:false, message:error.message})
        
    }
}


//logic foor single product na
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId)
        res.json({success: true, product})
        
    } catch (error) {
        console.log(error.stack);
        res.json({success:false, message:error.message})
        
    }

}

export {addProduct, listProducts, removeProduct, singleProduct}