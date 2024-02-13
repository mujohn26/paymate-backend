import db from "../models";

class TransactionService {

    static async createRecipient(recipientData){
        const response = db.recipient.create(recipientData);
        return response; 
    }

    static async createTransaction(transactionData){
        const response = db.Transaction.create(transactionData);
        return response; 
    }

    static async getTransactionsByUserId(userId) {
        const transactions = db.Transaction.findAll({ 
            where: { senderId: `${userId}` },
            include: [
                {model: db.recipient,},
                {model: db.wallet, attributes: ["walletLogo", "walletName"]},
                // {model: db.Charge, attributes: ["chargeAmout"]}


            ],  
        }
            );
        return transactions
    }

    static async getRecipeintById(recipientId) {
        const recipient = db.recipient.findAll({ where: { id: recipientId }, });
        return recipient
    }

}

export default TransactionService;