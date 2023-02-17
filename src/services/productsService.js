const Joi = require('joi');
const productsModel = require('../models/productsModel');

const idSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

const productSchema = Joi.object({
  name: Joi.string().min(5).max(45).required(),
});

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { status: 400, message: error.message };
  const product = await productsModel.getById(id);
  if (product.length < 1) return { status: 404, message: 'Product not found' };
  return { status: 200, product };
};

const create = async (name) => {
  const { error } = productSchema.validate({ name });
  if (error) return { status: 400, message: error.message };
  const id = await productsModel.create(name);
  return { status: 201, product: { id, name } };
};

const update = async (id, name) => {
  const { error } = productSchema.validate({ name });
  if (error) return { message: error.message };
  const oldProduct = await getById({ id });
  if (oldProduct.message) {
    return oldProduct;
  }
  const newProduct = { id, name };
  const result = await productsModel.update(newProduct);
  return result;
};

const deleteProduct = async (id) => {
  const verifyProduct = await getById({ id });
  if (verifyProduct.message) {
    return verifyProduct;
  }
  await productsModel.deleteProduct(id);
  return 'done';
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};
