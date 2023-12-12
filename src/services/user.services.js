import db from "../models";
class UserServices {

  static async getUserByphone(phone) {
    return db.User.findOne({ where: { phone: phone } });
  }
  static async createUser(userData) {
    const response = db.User.create(userData);
    return response;
  }
  static async getAllUsers() {
    return db.User.findAll();
  }
  static async deleteUser(id) {
    const deletedUser = await db.User.destroy({ where: { id: id } });
    return deletedUser;
  }
  static async updateUserByPhone(phone, updatedUserData) {
    const updateUser = await db.User.update(updatedUserData, { where: { phone: phone } });
    return updateUser;
  }
}

export default UserServices;
