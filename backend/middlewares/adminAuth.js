import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token){
            return res.json({success: false, message: 'Not Authourized Please Login Again'})
        }
        
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        if (decoded !== process.env.Admin_Email + process.env.Admin_Password ) {
            return res.json({success: false, message: 'Invalid Token'})
        }
        next()
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }


}

export default adminAuth