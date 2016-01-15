var express = require('express'),
	router = express.Router(),
	home = require('../controlleurs/home'),
	image = require('../controlleurs/image');
module.exports = function(app) {
	router.get('/', home.index);
	router.get('/images/:image_id', image.index);
	router.post('/images', image.create);
	router.post('/images/:image_id/like', image.like);
	router.post('/images/:image_id/commentaire', image.commentaire);
	router.delete('/images/:image_id', image.supprimerImage);
	app.use(router);
};
