import jwt from 'jsonwebtoken';
import UserServices from '../services/user.service';

class TokenHelper{
    static async generateToken(payload){
        const token = jwt.sign({
                payload
            }, process.env.JWTKEY);
        return token;
    }

    static async verifyToken(req,token){
        if (!token) {
            return false
          }
          try {
            const decodedToken = jwt.verify(token, process.env.JWTKEY);

            const user = await UserServices.getUserByphone(decodedToken.payload.phone);
            decodedToken.token = token;
            if (user === null) {
              return false;
            }
            req.user = user;
            return true
          } catch (error) {
            return false
          }
    }

}

export default TokenHelper;