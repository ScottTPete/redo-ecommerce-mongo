var mongoose = require('mongoose'),
	Product = require('../models/productModel')

module.exports = {
	
	createProduct: function(req, res, next) {
		Product.create(req.body, function(err, response) { //posts a product to db if it meets schema criteria
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(response);
			}
		})
	},
	
	getProducts: function(req, res, next) {
		Product.find(req.query, function(err, response) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(response);
			}
		})
	},
	
	getProductById: function(req, res, next) {
		Product.findById(req.params.id, function(err, response) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(response);
			}
		})
	},
	
	editProductById: function(req, res, next) {
		Product.findByIdAndUpdate(req.params.id, req.body, function(error, response){
			if(error) {
				return res.status(500).send(error);
			} else {
				return res.status(200).json(response);
			}
		});

	},
	
	removeProuctById: function(req, res, next) {
		Product.findByIdAndRemove(req.params.id, function(error, response){
			if(error) {
				return res.status(500).send(error);
			} else {
				return res.status(200).json(response);
			}
		})
	}
	
}
	