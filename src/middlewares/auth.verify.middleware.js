import UserServices from '../services/user.service'
import TokenHelper from "../helpers/token.helper";

class AuthVerifyMiddleWare{

    static async isTokenAndUserVerified(req,res,next){
        const isTokenAndUserVerified = await TokenHelper.verifyToken(req, req.headers.token)
        if (!isTokenAndUserVerified) {
            res.status(403).json({
                error: "There is issue with your account, please contact support team!!"
            })
            return;   
        }
        next() 
    }
}

export default AuthVerifyMiddleWare