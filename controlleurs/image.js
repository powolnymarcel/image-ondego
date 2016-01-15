var fs = require('fs'),
	path = require('path'),
 sidebar = require('../helpers/sidebar'),
Modeles = require('../modeles');
module.exports = {
	index: function(req, res) {
		var viewModel = {
			image: {},
			commentaires: []
		};
		Models.Image.findOne({ filename: { $regex: req.params.image_id }
			},
			function(err, image) {
				if (err) { throw err; }
				if (image) {
					image.vues = image.vues + 1;
					viewModel.image = image;
					image.save();
				} else {
					res.redirect('/');
				}
			});
	},
	create: function(req, res) {
		var sauvegarderImage = function() {
			//Sert de base à la generation d'un nom aleatoire
			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
				imgUrl = '';

			//Itère 6 fois afin de choisir 6caractères
			for(var i=0; i < 6; i+=1) {
				imgUrl += possible.charAt(Math.floor(Math.random() *
					possible.length));
			}

			//On déclare 3 variables Là ou seront stocké les images uploadée
			//Ici on cherche l'adresse du dossier temp
			var tempPath = req.file.path;
			//Ici on récupère l'extension du fichier
			var	ext = path.extname(req.file.originalname).toLowerCase();
			//Iic on indique le dossier final de l'image
			var	targetPath = path.resolve('./public/upload/' + imgUrl + ext);
			//If pour l'extension du fichier
			if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ===
				'.gif') {
				//param 1 = dossier temporaire
				//param2 = dossier cible
				//On transfère l'img du dossier temp vers dossier final
				fs.rename(tempPath, targetPath, function(err) {
					if (err) throw err;
					//Si ok on transfère vers la pagede l'image
					res.redirect('/images/'+ imgUrl);
				});
			} else {
				//Si erreur on annule l'image dans le dossier temp et on lance une erreur
				fs.unlink(tempPath, function (err) {
					if (err) throw err;
					res.json(500, {error: 'Uniquement des images png jpeg ou gif svp'});
				});
			}
		};
		sauvegarderImage();
	},
	like: function(req, res) {
		res.json({likes: 1});
	},
	commentaire: function(req, res) {
		res.send('The image:comment POST controller');
	}
};
