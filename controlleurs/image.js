var fs = require('fs'),
	path = require('path'),
 sidebar = require('../helpers/sidebar');
module.exports = {
	index: function(req, res) {
		var viewModel = {
			image: {
				uniqueId: 1,
				titre: 'Sample Image 1',
				description: 'This is a sample.',
				filename: 'sample1.jpg',
				vues: 12,
				likes: 0,
				timestamp: Date.now()
			},
			commentaires: [
				{
					image_id: 1,
					email: 'test@testing.com',
					nom: 'Test Tester',
					gravatar: 'http://lorempixel.com/75/75/animals/1',
					commentaire: 'This is a test comment...',
					timestamp: Date.now()
				},{
					image_id: 1,
					email: 'test@testing.com',
					nom: 'Test Tester',
					gravatar: 'http://lorempixel.com/75/75/animals/2',
					commentaire: 'Another followup comment!',
					timestamp: Date.now()
				}
			]
		};
		sidebar(viewModel, function(viewModel) {
			res.render('image', viewModel);
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
