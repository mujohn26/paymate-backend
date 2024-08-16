import TransactionService from "../services/transaction.service";
import UserServices from '../services/user.service'
import comparePassword from '../helpers/decryptor.helper'
import {v4 as uuidv4} from 'uuid'
import { generate as generateShortUuid } from 'short-uuid';


class TransactionController {

    static async createTransaction(req,res){
        try {
            const userId = req.user.dataValues.id
            const {walletId,amount,chargeId, currency, recipientName, recipientPhoneNumber, password, recipientCountry} = req.body
            const userInfo = await UserServices.getUserById(userId)
            const isPasswordCorrect = await TransactionController.checkPassword(userInfo.password, password)


            if (isPasswordCorrect) {
                const recipientData = {
                    fullName: recipientName,
                    phoneNumber: recipientPhoneNumber,
                    country: recipientCountry 
                }
                const recipient = await TransactionService.createRecipient(recipientData)
                const transactionData={
                    walletId: walletId,
                    senderId: userId, 
                    recipientId: recipient.dataValues.id,
                    amount: amount,
                    chargeId: chargeId,
                    currency: currency,
                    transactionId: await TransactionController.generateTransactionId()
                }

                const transaction = await TransactionService.createTransaction(transactionData)

                res.status(201).json({
                    message: `Payment was made successfully`,
                    data: transaction
                });
                
            }else{
                res.status(400).json({
                    error: `Please provide a correct password or contact our support team.`,
                });
            }
            
        } catch (error) { 
            res.status(500).json({
                error:  `${error} occurred`
            })  
        }
    }


    static  async getTransactionsByUserId(req,res){
        try {
            const userId = req.user.dataValues.id
            const transactions = await TransactionService.getTransactionsByUserId(userId)
            res.status(200).json({
                message: 'Your transactions were fetched successfully', 
                data:  transactions
            })  
            
        } catch (error) {
            res.status(500).json({
                error:  `${error} occurred`
            })    
        }
    }


    static async checkPassword(existingPassword, providedPassword){
        let decryptPasswordAndCompare = comparePassword(
            providedPassword,
            existingPassword
          );

          return decryptPasswordAndCompare
    }

    static async generateTransactionId() {
        const shortUuid = generateShortUuid();
        const currentDateTime = new Date();
        const formattedDateTime = `${currentDateTime.getFullYear()}${( currentDateTime.getMonth() + 1).toString().padStart(2, '0')}${(currentDateTime.getDate()).toString().padStart(2, '0')}`;
      
        const transactionId = `${shortUuid.substring(0, 8)}-${formattedDateTime}`;
        return transactionId;
      }
      

}

export default TransactionController;