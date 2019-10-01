const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')

class PurchaseController {

    async index(req, res) {
        const purchases = await Purchase.find()
            .populate('ad')
            .populate({
                path: 'purchaser',
                select: ['name', 'email']
            })
        return res.json(purchases)
    }

    async store(req, res) {
        const {
            ad,
            content
        } = req.body
        const purchaseAd = await Ad.findById(ad).populate('author')
        const user = await User.findById(req.userId)

        Purchase.create({
            ad: purchaseAd._id,
            purchaser: req.userId
        })

        Queue.create(PurchaseMail.key, {
            ad: purchaseAd,
            user,
            content
        }).save()

        return res.send()
    }

}


module.exports = new PurchaseController()