const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/search', productsController.searchProducts);
productsRouter.get('/:id', productsController.getById);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.deleteProduct);
productsRouter.get('/', productsController.getAll);
productsRouter.post('/', productsController.create);

module.exports = productsRouter;
