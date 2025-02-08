import jwt from 'jsonwebtoken'

const authUser = async (req, res, next)=> {

    const {token} = req.headers
    if(!token){
        return res.json({success: false, message: 'Not Authourized Please Login Again'})
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        req.body.userId = decoded.id
        next()
        
    } catch (error) {
        console.error(error)
        return res.json({success: false, message: 'Invalid Token'})
    
}

}

export default authUser