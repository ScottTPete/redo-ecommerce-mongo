var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongojs = require('mongojs'),
	app = express()



app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/public'))


//Database configuration//
var db = mongojs('ecommerceTwo', ['products']),
	productId = mongojs.ObjectId;

db.on('error', function (err) {
	console.log('database error', err)
})

db.on('connect', function () {
	console.log('database connected')
})

app.post('/api/products', function(req, res, next) {
	db.products.save(req.body, function(err, response) {
		if(err) {
			res.status(500).send(err)
		} else {
			res.status(200).json(response);
		}
	})
})

app.get('/api/products', function(req, res, next) {
	var query = req.query //is an empty object if nothing passed in

	db.products.find(query, function(err, response) {  //find with an empty object returns entire collection
		if(err) {
			res.status(500).send(err)
		} else {
			res.status(200).json(response);
		}
	})
})

app.get('/api/products/:id', function(req, res, next) {
	db.products.find({_id: productId(req.params.id)}, function(err, response) {
		if(err) {
			res.status(500).send(err)
		} else {
			res.status(200).json(response);
		}
	})
})

app.put('/api/products/:id', function(req, res, next) {
	db.products.update({_id: productId(req.params.id)}, {$set: req.body}, function(err, response) {
		if(err) {
			res.status(500).send(err)
		} else {
			res.status(200).json(response);
		}
	})
	
})

app.delete('/api/products/:id', function(req, res, next) {
	db.products.remove({_id: productId(req.params.id)}, function(err, response) {
		if(err) {
			res.status(500).send(err)
		} else {
			res.status(200).json(response);
		}
	})
})













//SET UP PORT//
var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Listening on port ' + port);
})