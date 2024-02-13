import { Op } from 'sequelize';
import db from "../models";
import user from '../models/user';

class AccountSettingServices {

  static async createUserInformation(userData) {
    const response = db.userInformation.create(userData);
    return response;
  }

  static async createUserWallet(walletData) {
    const response = db.wallet.create(walletData);
    return response;
  }

  static async getWalletsByUserId(userId) {
    const wallets = db.wallet.findAll({ where: { userId: userId } });
    return wallets
  }

  static async getUserInfoByUserId(userId) {
    return db.userInformation.findOne({ where: { userId: userId } });
  }


  static async getUserDocumentsByUserId(userId) {
    return db.userDocuments.findAll({ where: { userId: userId } });
  }


  static async updateUserInfoByUserId(updatedUserData) {
    console.log(updatedUserData)
    if (updatedUserData.documents !== undefined) {
      await AccountSettingServices.updateDocumentsData(updatedUserData)
    }
    const updateUser = await db.userInformation.update(updatedUserData, { where: { userId: updatedUserData.userId } });
    return updateUser;
  }

  static async updateDocumentsData(userData) {
    const updatePromises = userData.documents.map(async (data) => {
      const existingDocument = await db.userDocuments.findOne({
        where: {
          userId: userData.userId,
          documentType: data.documentType,
        },
      });
  
      if (existingDocument) {
        return existingDocument.update(data);
      } else {
        return db.userDocuments.create({
          userId: userData.userId,
          documentType: data.documentType,
          documentLink: data.documentLink
        });
      }
    });
  
    await Promise.all(updatePromises);
  }

}

export default AccountSettingServices;
