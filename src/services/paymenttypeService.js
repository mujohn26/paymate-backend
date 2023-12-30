// paymenttypeServices.js

import paymenttype from "../models/paymenttype.js";

export async function getpaymenttypeByphone(phone) {
  return paymenttype.findOne({ where: { phone: phone } });
}

export async function createpaymenttype(paymenttypeData) {
  const response = paymenttype.create(paymenttypeData);
  return response;
}

export async function getAllpaymenttypes() {
  return paymenttype.findAll();
}

export async function deletepaymenttype(id) {
  const deletedpaymenttype = await paymenttype.destroy({ where: { id: id } });
  return deletedpaymenttype;
}

export async function updatepaymenttypeByPhone(phone, updatedpaymenttypeData) {
  const updatepaymenttype = await paymenttype.update(updatedpaymenttypeData, { where: { phone: phone } });
  return updatepaymenttype;
}

export default { getpaymenttypeByphone, createpaymenttype, getAllpaymenttypes, deletepaymenttype, updatepaymenttypeByPhone };
