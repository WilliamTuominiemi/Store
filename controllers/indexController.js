const Item = require('../models/Item')

const render_index = (req, res, user, dev) => {
	Item.find()
	.then((result) => {
		console.log(result)
		res.render('index', { title: 'Store', user: user, dev: dev, items: result})
	})
	.catch((err) => {
		console.log(err)
	})
}

// Redirects to /posts
const index_store = (req, res) => {
	if(req.user === undefined) {
		console.log("not logged in")
		render_index(req, res, "undefined", false)
	}	else {
		//console.log(req.user)
		// Dev googleId: 118195899940427162005
		if(req.user.googleId.toString() === "118195899940427162005")	{
			render_index(req, res, req.user, true)

		}	else {
			render_index(req, res,req.user, false)
		}
	}
}

const index_dev = (req, res) => {
	if(req.user === undefined) {
		res.status(404).render('404', { title: 'Page not found', user: "undefined", dev: false })
	}	else {
		if(req.user.googleId.toString() === "118195899940427162005" ) {
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
	index_dev_post
}
