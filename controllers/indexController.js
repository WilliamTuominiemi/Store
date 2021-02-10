const Item = require('../models/Item')

const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

const admin_id = `${process.env.ADMIN_ID}`

const render_index = (req, res, user, dev, page) => {
	Item.find()
	.then((result) => {
		res.render(page, { title: 'Store', user: user, dev: dev, items: result})
	})
	.catch((err) => {
		console.log(err)
	})
}

// Redirects to /posts
const index_store = (req, res) => {
	if(req.user === undefined) {
		render_index(req, res, "undefined", false, 'index')
	}	else {
		if(req.user.googleId.toString() === admin_id)	{
			render_index(req, res, req.user, true, 'index')

		}	else {
			render_index(req, res,req.user, false, 'index')
		}
	}
}

const index_dev = (req, res) => {
	if(req.user === undefined) {
		res.status(404).render('404', { title: 'Page not found', user: "undefined", dev: false })
	}	else {
		if(req.user.googleId.toString() === admin_id) {
			res.render('dev', { title: 'DEV', user: req.user,  dev: true })
		}	else {
			res.status(404).render('404', { title: 'Page not found', user: "undefined", dev: false })
		}
	}
}

const index_dev_post = (req, res) => {
	const item = new Item(req.body)
	item
		.save()
		.then((result) => {
			res.redirect('/dev')
		})
		.catch((err) => {
			console.log(err)
	})
}

const product_page = (req, res) => {
	const param = req.params.id
	const page = 'product'
	Item.find( {_id: param})
	.then((result) => {
		if(req.user === undefined) {
			res.render(page, { title: result[0].title, user: "undefined", dev: false, data: result[0]})
		}	else {
			if(req.user.googleId.toString() === admin_id)	{
				res.render(page, { title: result[0].title, user: "undefined", dev: false, data: result[0]})
			}	else {
				res.render(page, { title: result[0].title, user: "undefined", dev: false, data: result[0]})
			}
		}
	})
}

// Renders EJS page
const index_about = (req, res) => {
	//res.render('about', { title: 'About' })
}

// View profile only if our are signed in
const index_profile = (req, res) => {
	/*try {
		res.render('profilenew', {
			title: 'Profile',
			displayName: req.user.displayName,
			image: req.user.image,
		})
		const param = String(req.user.googleId)
		Post.find({ posterId: param })
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log(result)
			res.render('profilenew', { title: 'All Posts', posts: result, displayName: req.user.displayName, googleId: req.user.googleId })
		})
		.catch((err) => {
			console.log(err)
	})
	} catch (err) {
		console.log(err)
		res.redirect("/auth/google")
	}*/
}

const index_profile_ = (req, res) => {
	/*try {
		/*res.render('profilenew', {
			title: 'Profile',
			displayName: req.user.displayName,
			image: req.user.image,
		})
		const param = req.params.posterId

		console.log(req.params.posterId)

		Post.find( {posterId: param, privacy: "public"} )
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log(result)
			res.render('profile', { title: result[0].username, posts: result, displayName: req.user.displayName, googleId: req.user.googleId })		
		})
		.catch((err) => {
			console.log(err)
	})
	} catch (err) {
		console.log(err)
		res.status(404).render('404', { title: 'Page not found' })
	}*/
}


const post_delete = (req, res) => {	
	/*console.log(req.params.id)
	
	const param = req.params.id

	Post.find( {_id: param} )
	.remove()
	.then((result) => {
		res.redirect('/profile')
	})
	.catch((err) => {
		console.log(err)
	})*/
}



module.exports = {
	index_store,
	index_about,
	index_profile,
	index_profile_,
	post_delete,
    index_dev,
	index_dev_post,
	product_page
}
