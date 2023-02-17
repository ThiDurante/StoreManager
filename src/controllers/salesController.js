const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.length < 1) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const sales = await salesService.create(req.body);
  if (!sales.message) return res.status(201).json(sales);
  if (sales.message.includes('greater')) {
    return res.status(422)
      .json({ message: sales.message });
  }
  if (sales.message.includes('required')) {
    return res.status(400)
      .json({ message: sales.message });
  }
  if (sales.message.includes('Product')) {
    return res.status(404)
      .json({ message: sales.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteSale(id);
  if (result.message === 'done') {
    return res.status(204).end();
  } return res.status(404).json({ message: result.message });
};

const createMessage = (result) => {
  if (result.message.includes('greater')) {
    return { status: 422, message: result.message };
  } if (result.message.includes('required')) {
    return { status: 400, message: result.message };
  } if (result.message.includes('Sale')) {
    return { status: 404, message: result.message };
  } if (result.message.includes('Product')) {
    return { status: 404, message: result.message };
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;
  const result = await salesService.update(id, updatedSale);
  if (!result.message) return res.status(200).json(result);
  const response = createMessage(result);
  return res.status(response.status).json({ message: response.message });
  // if (result.message.includes('greater')) {
  //   return res.status(422)
  //     .json({ message: result.message });
  // } if (result.message.includes('required')) {
  //   return res.status(400)
  //     .json({ message: result.message });
  // } if (result.message.includes('Sale')) {
  //   return res.status(404)
  //     .json({ message: result.message });
  // } if (result.message.includes('Product')) {
  //   return res.status(404)
  //     .json({ message: result.message });
  // }
};

module.exports = {
  create,
  getAll,
  getSaleById,
  deleteSale,
  update,
};
