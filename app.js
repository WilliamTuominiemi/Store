const express = require('express')
const path = require('path')
const passport = require('passport')
const dotenv = require('dotenv')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const post = require('./routes/post')
const auth = require('./routes/auth')
const index = require('./routes/index')
const pay = require('./routes/pay')

const Post = require('./models/Item')
const connectDB = require('./config/db')

const ejs = require('ejs')
const paypal = require('paypal-rest-sdk')


// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Express app
const app = express()

// Port number
const PORT1 = process.env.PORT || 3000

// PayPal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
  });

// Connect to MongoDB
connectDB()

// Register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))


// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
)

// Passport and express middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded())

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Routes
app.use('/posts', post)
app.use('/auth', auth)
//app.use('/pay', pay)
app.use('/', index)

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: 'Page not found', user: "undefined", dev: false })
})

// Listen for requests
app.listen(PORT1, () => {
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT1}`)
})
