var Stats = require('./stats'),
	Images = require('./images'),
	Commentaires = require('./commentaires'),
	async = require('async');
module.exports = function(viewModel, callback){
	async.parallel([
		function(next) {
			Stats(next);
		},
		function(next) {
			next(null, Images.popular());
		},
		function(next) {
			Commentaires.newest(next);

		}
	], function(err, results){
		viewModel.sidebar = {
			stats: results[0],
			popular: results[1],
			commentaires: results[2]
		};
		callback(viewModel);
	});
};
