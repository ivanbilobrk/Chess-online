const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionsController');

router.get('/', transactionController.getAllTransactions);
router.get('/userTransactions', transactionController.getAllTransactionsForUser);
router.post('/addTransaction', transactionController.addNewTransaction);

module.exports = router;