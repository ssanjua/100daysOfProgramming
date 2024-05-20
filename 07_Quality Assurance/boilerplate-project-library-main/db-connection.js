const mongoose = require('mongoose')

const uri = process.env.MONGO_DB

const db = mongoose.connect(uri)
    .then(() => {
        console.log('database connected')
    }).catch(error => {
        console.log(error)
    })

module.exports = db