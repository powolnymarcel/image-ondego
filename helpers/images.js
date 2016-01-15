var modeles = require('../modeles');
module.exports = {
	popular: function(callback) {
		modeles.Image.find({}, {}, { limit: 9, sort: { likes: -1 }},
			function(err, images) {
				if (err) throw err;
				callback(null, images);
			});
	}
};
