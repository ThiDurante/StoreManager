const camelize = require('camelize');
const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getById({ id });
    if (product.message) {
      return res.status(product.status).json({ message: product.message });
    }
      return res.status(product.status).json(product.product[0]);
};

const create = async (req, res) => {
  const { name } = req.body;
  const createdProduct = await productsService.create(name);
  if (createdProduct.message) {
    if (createdProduct.message.includes('length')) {
        return res.status(422).json({ message: createdProduct.message });
    }
    if (createdProduct.message) {
        return res.status(400).json({ message: createdProduct.message });
    }
  }
  return res.status(201).json(createdProduct.product);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const updatedProduct = await productsService.update(id, name);
  if (updatedProduct.message) {
    if (updatedProduct.message.includes('length')) {
      return res.status(422).json({ message: updatedProduct.message });
    }
    if (updatedProduct.message.includes('required')) {
      return res.status(400).json({ message: updatedProduct.message });
    }
    return res.status(updatedProduct.status)
      .json({ message: updatedProduct.message });
}
  return res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);
  if (product.message) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

const searchProducts = async (req, res) => {
  const product = req.query.q;
  if (product.length === 0) {
    const result = await productsService.getAll();
    return res.status(200).json(result);
  }
  const allProducts = await productsService.getAll();
  const wantedProduct = camelize(allProducts).find((product1) => product1.name.includes(product));
  return res.status(200).json([wantedProduct]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  searchProducts,
};
