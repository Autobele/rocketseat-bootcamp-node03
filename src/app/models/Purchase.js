const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Purchase = new mongoose.Schema({
    ad: {
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    purchaser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

Purchase.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', Purchase)