const Ad = require('../models/Ad')

class ApprovePurchaseController {
    async store(req, res) {

        const {ad} = req.params
        
        if(!await Ad.find({purchaseBy: {$exists: false}}, {_id: ad})){
            return res.json({message: 'Sold out'})
        }

    }
}

module.exports = new ApprovePurchaseController()