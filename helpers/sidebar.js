var Stats = require('./stats'),
	Images = require('./images'),
	Commentaires = require('./commentaires');
module.exports = function(viewModel, callback){
	viewModel.sidebar = {
		stats: Stats(),
		popular: Images.popular(),
		commentaires: Commentaires.newest()
	};
	callback(viewModel);
};
