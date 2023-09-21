import jwt from 'jsonwebtoken';
import UserServices from '../services/user.services';

class TokenHelper{
    static async generateToken(payload){
        const token = jwt.sign({
                payload
            }, process.env.JWTKEY, { expiresIn: '6d' });
        return token;
    }

    static async verifyToken(req,res,next,token){
        if (!token) {
            return response.errorMessage(res, 'No token provided, Access Denied!', 401);
          }
          try {
            const decodedToken = jwt.verify(token, process.env.JWTKEY);
            const user = await UserServices.getUserByTelephone(decodedToken.payload.telephone);
            decodedToken.token = token;
            if (user === null) {
              return response.errorMessage(res, 'You provided the invalid token!', 401);
            }
            req.user = user;
            return next();
          } catch (error) {
            response.errorMessage(res, error.message, 401);
          }
    }
}

export default TokenHelper;