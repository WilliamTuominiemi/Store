const express = require('express')
const payController = require('../controllers/payController')

const router = express.Router()

router.post('/', payController.pay)
router.get('/success', payController.success)
router.get('/cancel', payController.cancel)

//router.get('/add', postController.post_add_get)
//router.get('/delete/:id', postController.post_delete)


module.exports = router
