const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

const allIds = async () => {
  const query = 'SELECT id FROM StoreManager.products';
  const products = await connection.execute(query);
  const result = Object.values(JSON.parse(JSON.stringify(products[0])));
  return result.map((e) => e.id);
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

const update = async ({ id, name }) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [newProduct] = await connection.execute(query, [name, id]);
  return camelize(newProduct);
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
  return 'done';
};

module.exports = {
  getAll,
  getById,
  create,
  allIds,
  update,
  deleteProduct,
};
