const express = require('express')
const { 
  createInvoice, 
  getInvoices, 
  getInvoice, 
  deleteInvoice, 
  updateInvoice 
} = require('../controllers/invoiceController')

const router = express.Router()

// GET all invoices
router.get('/', getInvoices)

// GET single invoice
router.get('/:id', getInvoice)

// POST a new invoice
router.post('/', createInvoice)

// DELETE a invoice
router.delete('/:id', deleteInvoice)

// UPDATE a invoice
router.patch('/:id', updateInvoice)

module.exports = router
