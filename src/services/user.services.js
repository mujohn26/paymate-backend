import db from "../models";
class UserServices {
  static async createUser(userData) {
    const response = db.User.create(userData);
    return response;
  }
}

export default UserServices;
