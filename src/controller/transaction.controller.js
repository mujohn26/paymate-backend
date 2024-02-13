import TransactionService from "../services/transaction.service";
import UserServices from '../services/user.service'
import comparePassword from '../helpers/decryptor.helper'

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
                    currency: currency
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

}

export default TransactionController;