var modeles = require('../modeles'),
	async = require('async');
module.exports = function(callback) {
	async.parallel([
		function(next) {
			modeles.Image.count({}, next);
		},
		function(next) {
			modeles.Commentaire.count({}, next);
		},
		function(next) {
			modeles.Image.aggregate({ $group : {
				_id : '1',
				viewsTotal : { $sum : '$vues' }
			}}, function(err, result) {
				var viewsTotal = 0;
				if (result.length> 0) {
					viewsTotal += result[0].viewsTotal;
				}
				next(null, viewsTotal);
			});		},
		function(next) {
			modeles.Image.aggregate({ $group : {
				_id : '1',
				likesTotal : { $sum : '$likes' }
			}}, function (err, result) {
				var likesTotal = 0;
				if (result.length> 0) {
					likesTotal += result[0].likesTotal;
				}
				next(null, likesTotal);
			});		}
	], function(err, results){
		callback(null, {
			images: results[0],
			commentaires: results[1],
			vues: results[2],
			likes: results[3]
		});
	});
};
