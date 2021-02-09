const express = require('express')
const indexController = require('../controllers/indexController')
const payController = require('../controllers/payController')

const router = express.Router()

router.get('/', indexController.index_store)
router.post('/pay', payController.pay)
router.get('/success', payController.success)
router.get('/cancel', payController.cancel)

//router.get('/about', indexController.index_about)
//router.get('/profile', indexController.index_profile)
//router.get('/profile/:posterId', indexController.index_profile_)
//router.get('/delete/:id', indexController.post_delete)


module.exports = router
