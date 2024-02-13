import AccountSettingServices from '../services/accountSetting.service'
import UserServices from '../services/user.service';

class UserAccountSetting {

    static async createUserAccountInfo(req,res){
        try {
            const newData = UserAccountSetting.getRequestBodyData(req);
            newData['userId'] = req.user.dataValues.id
            const accountSettingInfo = await AccountSettingServices.getUserInfoByUserId(newData.userId)
            if (accountSettingInfo) {
                const accountSettingAdded = await AccountSettingServices.updateUserInfoByUserId(newData)
                res.status(200).json({
                    message:  `User info were updated successfully`,
                    accountSettingAdded
                })
            }else{
                const accountSettingAdded = await AccountSettingServices.createUserInformation(newData)
                res.status(201).json({
                    message:  `User info were added successfully`,
                    accountSettingAdded
                })
            }
            
        } catch (error) {
            res.status(500).json({
                error:  `${error} occurred`
            })
        }

    }

    static async getUserProfileInfo(req,res){
        try {
            const userId = req.user.dataValues.id
            const accountSettingInfo = await AccountSettingServices.getUserInfoByUserId(userId)
            const userInfo = await UserServices.getUserById(userId)
            const userDocumentsInfo = await AccountSettingServices.getUserDocumentsByUserId(userId)
            const userInfos = UserAccountSetting.formattingUserData(accountSettingInfo==null? null : accountSettingInfo.dataValues,userInfo.dataValues,userDocumentsInfo==null? null : userDocumentsInfo)
            res.status(200).json({
                message:  `User info were fetched successfully`,
                data: userInfos
            })
        } catch (error) {
            res.status(500).json({
                error:  `${error} occurred`
            }) 
        }
    }

    static async addPaymentMethod(req,res){
        try {
         const userId = req.user.dataValues.id
         const {walletName,accountId,phoneNumber,walletLogo} = req.body.paymentMethodData
         const walletData = {walletName:walletName,accountId:accountId,walletLogo:walletLogo,userId:userId,phoneNumber:phoneNumber}
         const accountSettingAdded = await AccountSettingServices.createUserWallet(walletData)
         res.status(201).json({
            message:  `Wallet was added successfully`,
            data: walletData
        })
  
        } catch (error) {
            res.status(500).json({
                error:  `${error} occurred`
            })  
        }
    }

    static async getPaymentMethods(req,res){
        try {
            const userId = req.user.dataValues.id
            const userInfo = await UserServices.getUserById(userId)
            const walletData = await AccountSettingServices.getWalletsByUserId(userId)
            const userWallets = walletData.map((data)=>{
                let wallet = data.dataValues
                const walletData={
                    id: wallet.id,
                    userId: wallet.userId,
                    walletName: wallet.walletName,
                    accountId: wallet.accountId,
                    walletLogo: wallet.walletLogo,
                    phoneNumber: wallet.phoneNumber,
                    createdAt: wallet.createdAt,
                    user: userInfo.dataValues
                    
                }
                return walletData
            })
            res.status(200).json({
               message:  `Wallets were fetched successfully`,
               data: {userWallets}
           })
     
           } catch (error) {
               res.status(500).json({
                   error:  `${error} occurred`
               })  
           } 
    }

    static getRequestBodyData(req){
        const dataObject = {};
        let bodyArr = [
            {address:req.body.profileData.address} ,
            {country:req.body.profileData.country},
            {profilePicture: req.body.profileData.profilePicture},
            {nationalId: req.body.profileData.nationalId},
            {email: req.body.profileData.email},
            {documents: req.body.profileData.documents},
        ]
        bodyArr.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (obj[key] !== undefined) {
                    dataObject[key] = obj[key];
                }
            });
        });

        return dataObject;
    }

    static formattingUserData(accountInfo,userInfo, userDocumentsInfo){
        
        const userData = {
            names: userInfo.names,
            phone: userInfo.phone,
            address: accountInfo == null? '': accountInfo.address,
            country: accountInfo == null? '': accountInfo.country,
            profilePicture: accountInfo == null? '': accountInfo.profilePicture,
            nationalId: accountInfo == null? '': accountInfo.nationalId,
            email: accountInfo == null? '': accountInfo.email,
            password: userInfo.password,
            documents: userDocumentsInfo.map((data)=>{return data})
        }
    return userData
    }

} 

export default UserAccountSetting