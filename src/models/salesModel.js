const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT id AS saleId, date, product_id AS productId, quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products AS sales_products
    ON sales.id = sales_products.sale_id;`;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
   const query = `SELECT date, product_id, quantity FROM StoreManager.sales AS sales
    INNER JOIN StoreManager.sales_products as sales_products
    on sales.id = sales_products.sale_id AND sales.id = ?
    ORDER BY sales.id`;
  const [sale] = await connection.execute(query, [id]);
  return camelize(sale);
};

const createSale = async () => {
  const saleQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [saleTable] = await connection.execute(saleQuery);
  return saleTable.insertId;
};

const create = async (sale, id) => {
  const query = `INSERT INTO StoreManager.sales_products
   (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
   const newSale = await connection
     .execute(query, [id, sale.productId, sale.quantity]);
  return newSale;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [id]);
  return 'done';
};

const update = async (saleId, updatedSale) => {
  const deleteQuery = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(deleteQuery, [saleId]);
  const queryValues = updatedSale.map(() => '(?, ? ,?)').join(', ');
  const query = `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES ${queryValues}`;
  const realValues = updatedSale.map((sale) => [saleId, sale.productId, sale.quantity]).flat();
  const [newSale] = await connection.execute(query, realValues);
  return camelize(newSale);
};

module.exports = {
  create,
  createSale,
  getAll,
  getSaleById,
  deleteSale,
  update,
};
