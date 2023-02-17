const Joi = require('joi');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const saleSchema = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return sale;
};

const checkInfo = async (salesArr) => {
  const allProductIds = await productsModel.allIds();
  for (let i = 0; i < salesArr.length; i += 1) {
    const { error } = saleSchema.validate(salesArr[i]);
    if (error) return { message: error.message };
    if (!allProductIds.includes(salesArr[i].productId)) return { message: 'Product not found' };
  }
};

const create = async (salesArr) => {
  const validateInfo = await checkInfo(salesArr);
  if (validateInfo) return validateInfo;
  // for (let i = 0; i < salesArr.length; i += 1) {
  //   const { error } = saleSchema.validate(salesArr[i]);
  //   if (error) return { message: error.message };
  //   const checkId = productsModel.getById(salesArr[i].productId);
  //   if (checkId.length < 1) return { message: 'Product not found' };
  // }
    const saleId = await salesModel.createSale();
    const promises = salesArr.map(async (sale) => {
      await salesModel.create(sale, saleId);
    });
    await Promise.all(promises);
    return { id: saleId, itemsSold: salesArr };
};

const deleteSale = async (id) => {
  const verifySale = await getSaleById(id);
  if (verifySale.length === 0) return { message: 'Sale not found' };
  await salesModel.deleteSale(id);
  return { message: 'done' };
};

const update = async (id, updatedSale) => {
  const validateInfo = await checkInfo(updatedSale);
  if (validateInfo) return validateInfo;
  const sale = await salesModel.getSaleById(id);
  if (sale.length === 0) return { message: 'Sale not found' };
  await salesModel.update(id, updatedSale);
  return { saleId: id, itemsUpdated: updatedSale };
};

module.exports = {
  create,
  getAll,
  getSaleById,
  deleteSale,
  update,
};
