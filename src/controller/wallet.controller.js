import UserServices from "../services/user.service";
import axios from 'axios'
import fetch from 'cross-fetch';
import { v4 as uuidv4 } from 'uuid';



class WalletController {

    static async topUpToWallet(req,res){
        const userId = req.user.dataValues.id;
        const {amount,walletId, pin, phoneNumber} =  req.body;
        const isPinCorrect = await WalletController.checkTransactionPin(userId,pin)

        if (!isPinCorrect) {
            res.status(201).json({
                message: `Invalid Pin Please try again`,
            });
        }else{
            const accessToken  = await WalletController.getAccessToken()
            const result = await topUpWallet(accessToken, phoneNumber, amount);
            UserServices.updateWalletById({amount: amount}, walletId)
            res.json(result);
        }
    }
 
    static async checkTransactionPin(userId,userPin){
        const user = await UserServices.getUserById(userId)
        if (user.dataValues.pin == userPin) {
            return true;
        }else{
            return false;
        }
        
    }

    static async topUpWallet (accessToken, phoneNumber, amount){
        const response = await axios.post(`${process.env.AIRTEL_BASE_URL}/standard/v1/payments/`, {
            reference: uuidv4(), // Unique reference ID for the transaction
            subscriber: {
              country: "TZA",
              currency: "TZS",
              msisdn: phoneNumber
            }, 
            transaction: {
              amount: amount,
              currency: "TZS",
              id: `txn_${uuidv4()}`
            }
          }, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          });
        
          return response.data;
    }

    static async getAccessToken  ()  {
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          };

        const inputBody= {
            "client_id": process.env.AITEL_CLIENT_ID,
            "client_secret": process.env.AIRTEL_CLIENT_SECRET,
            "grant_type": "client_credentials"
          }
          
          fetch('https://openapiuat.airtel.africa/auth/oauth2/token',
          {
            method: 'POST',
            body: inputBody,  
            headers: headers
          }).then(function(res) {
              return res.json();
          }).then(function(body) {
              console.log(body);
          });
      };
}




export default WalletController;