var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
//	mongojs = require('mongojs'),
	mongoose = require('mongoose'),
	productCtrl = require('./server/controllers/products.server.ctrl')
	app = express()



app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/public'))

mongoose.connect('mongodb://localhost/products', function(err) {
	if(err) {
		console.log(err + 'bad shit')
	} else {
		console.log('good to go')
	}
})

app.post('/products', productCtrl.createProduct); 

app.get('/products', productCtrl.getProducts);

app.get('/products/:id', productCtrl.getProductById);

app.put('/products/:id', productCtrl.editProductById);

app.delete('/products/:id', productCtrl.removeProuctById);

//SET UP PORT//
var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Listening on port ' + port);
})









//MongoJS configuration//
/*var db = mongojs('ecommerceTwo', ['products']),
	productId = mongojs.ObjectId;

db.on('error', function (err) {
	console.log('database error', err)
})

db.on('connect', function () {
	console.log('database connected')
})*/

