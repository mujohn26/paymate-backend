// paymentmethodServices.js

import paymentmethod from "../models/paymentmethod";

export async function getpaymentmethodByphone(id) {
  return paymentmethod.findOne({ where: { accountId: id } });
}

export async function createpaymentmethod(paymentmethodData) {
  const response = paymentmethod.create(paymentmethodData);
  return response;
}

export async function getAllpaymentmethods() {
  return paymentmethod.findAll();
}

export async function deletepaymentmethod(id) {
  const deletedpaymentmethod = await paymentmethod.destroy({ where: { id: id } });
  return deletedpaymentmethod;
}

export async function updatepaymentmethodByPhone(phone, updatedpaymentmethodData) {
  const updatepaymentmethod = await paymentmethod.update(updatedpaymentmethodData, { where: { phone: phone } });
  return updatepaymentmethod;
}

export default { getpaymentmethodByphone, createpaymentmethod, getAllpaymentmethods, deletepaymentmethod, updatepaymentmethodByPhone };
