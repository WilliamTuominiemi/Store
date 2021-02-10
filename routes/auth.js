const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')

const router = express.Router()

router.get(
	'/google', 
	passport.authenticate('google', { scope: ['profile'] }), 
	(req, res) => {
		console.log(req)
	} 
)

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	(req, res) => {
		console.log(req)
		res.redirect('/')
	}
)

router.get('/logout', authController.auth_logout)

module.exports = router
