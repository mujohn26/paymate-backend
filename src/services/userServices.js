// userServices.js

import User from '../models/user.js';

export async function getUserByphone(phone) {
  return User.findOne({ where: { phone: phone } });
}

export async function createUser(userData) {
  const response = User.create(userData);
  return response;
}

export async function getAllUsers() {
  return User.findAll();
}

export async function deleteUser(id) {
  const deletedUser = await User.destroy({ where: { id: id } });
  return deletedUser;
}

export async function updateUserByPhone(phone, updatedUserData) {
  const updateUser = await User.update(updatedUserData, { where: { phone: phone } });
  return updateUser;
}

export default { getUserByphone, createUser, getAllUsers, deleteUser, updateUserByPhone };
