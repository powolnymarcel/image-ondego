var fs = require('fs'),
	path = require('path'),
 sidebar = require('../helpers/sidebar'),
Modeles = require('../modeles'),md5 = require('MD5');
module.exports = {
	index: function(req, res) {
		var viewModel = {
			image: {},
			commentaires: []
		};
		Modeles.Image.findOne({ filename: { $regex: req.params.image_id }
			},
			function(err, image) {
				if (err) { throw err; }
				if (image) {
					image.vues = image.vues + 1;
					viewModel.image = image;
					image.save();
					Modeles.Commentaire.find({ image_id: image._id}, {}, { sort: {
							'timestamp': 1 }},
						function(err, commentaires){
							if (err) { throw err; }
							viewModel.commentaires = commentaires;
							sidebar(viewModel, function(viewModel) {
								res.render('image', viewModel);
							});
						}
					);
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

			//On cherche et vérifie si le nom aléatoire a déjà ete crée, si oui on relance la fn
			Modeles.Image.find({ filename: imgUrl }, function(err, images) {
				if (images.length> 0) {
					sauvegarderImage();
				} else {
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
					var newImg = new Modeles.Image({
						titre: req.body.titre,
						description: req.body.description,
						filename: imgUrl + ext
					});
					newImg.save(function(err, image) {
						console.log('Image uploadee avec succes: ' + image.filename);
						res.redirect('/images/' + image.uniqueId);
					});
				});
			} else {
				//Si erreur on annule l'image dans le dossier temp et on lance une erreur
				fs.unlink(tempPath, function (err) {
					if (err) throw err;
					res.json(500, {error: 'Only image files are allowed.'});
				});
			}
			/* Start new code: */
		}
	});
/* End new code: */
};
		sauvegarderImage();
	},
	like: function(req, res) {
		Modeles.Image.findOne({ filename: { $regex: req.params.image_id }
			},
			function(err, image) {
				if (!err && image) {
					image.likes = image.likes + 1;
					image.save(function(err) {
						if (err) {
							res.json(err);
						} else {
							res.json({ likes: image.likes });
						}
					});
				}
			});
	},
	commentaire: function(req, res) {
		Modeles.Image.findOne({ filename: { $regex: req.params.image_id }
			},
			function(err, image) {
				if (!err && image) {
					var newComment = new Modeles.Commentaire(req.body);
					newComment.gravatar = md5(newComment.email);
					newComment.image_id = image._id;
					newComment.save(function(err, commentaire) {
						if (err) { throw err; }
						res.redirect('/images/' + image.uniqueId + '#' + commentaire._id);
					});
				} else {
					res.redirect('/');
				}
			});
	},

	supprimerImage: function(req, res) {
		Modeles.Image.findOne({ filename: { $regex: req.params.image_id }
		},function(err, image) {
			if (err) { throw err; }
			fs.unlink(path.resolve('./public/upload/' + image.filename),
				function(err) {
					if (err) { throw err; }
					Modeles.Commentaire.remove({ image_id: image._id},
						function(err) {
							image.remove(function(err) {
								if (!err) {
									res.json(true);
								} else {
									res.json(false);
								}
							});
						});
				});
		});

	}
};
