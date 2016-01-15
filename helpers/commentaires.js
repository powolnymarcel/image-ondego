var modeles = require('../modeles'),
	async = require('async');

module.exports = {
	newest: function(callback) {
		modeles.Commentaire.find({}, {}, { limit: 5, sort: { 'timestamp': -1 }
			},
			function(err, commentaires){
				var attachImage = function(commentaire, next) {
					modeles.Image.findOne({ _id : commentaire.image_id},
						function(err, image) {
							if (err) throw err;
							commentaire.image = image;
							next(err);
						});
				};
				async.each(commentaires, attachImage,
					function(err) {
						if (err) throw err;
						callback(err, commentaires);
					});
			});
	}
};

