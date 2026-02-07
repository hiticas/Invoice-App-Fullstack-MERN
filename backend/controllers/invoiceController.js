const Invoice = require('../models/invoiceModel')
const mongoose = require('mongoose')

// get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 })
    res.status(200).json(invoices)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get a single invoice
const getInvoice = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such invoice' })
  }

  const invoice = await Invoice.findById(id)

  if (!invoice) {
    return res.status(404).json({ error: 'No such invoice' })
  }

  res.status(200).json(invoice)
}


// create a new invoice
const createInvoice = async (req, res) => {
  const { title } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add doc to db
  try {
    const invoice = await Invoice.create({ title })
    res.status(200).json(invoice)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such invoice' })
  }

  const invoice = await Invoice.findOneAndDelete({_id: id})

  if (!invoice) {
    return res.status(400).json({ error: 'No such invoice' })
  }

  res.status(200).json(invoice)
}

// update a invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such invoice' })
  }

  const invoice = await Invoice.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!invoice) {
    return res.status(400).json({ error: 'No such invoice' })
  }

  res.status(200).json(invoice)
}

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoice
}