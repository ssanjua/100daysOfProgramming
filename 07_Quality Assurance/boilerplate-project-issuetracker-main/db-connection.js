const mongoose = require('mongoose')

const uri = process.env.MONGO_URL

const db = mongoose.connect(uri)

module.exports = db