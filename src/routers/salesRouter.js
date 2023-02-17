const express = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.delete('/:id', salesController.deleteSale);
salesRouter.get('/:id', salesController.getSaleById);
salesRouter.put('/:id', salesController.update);
salesRouter.post('/', salesController.create);

module.exports = salesRouter;
