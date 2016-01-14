//On déclare toutes les variables par modules utilisé
//Ensuite on defini le module qui sera exporté par ce fichier pour l'appli
// Une fn pourra accepter l'objet exporté en tant que paramètre
var path = require('path'),
	routes = require('./routes'),
	//Moteur de templating comme jade
	exphbs = require('express-handlebars'),
	express = require('express'),
	//parse le contenu d'un form submité via POST
	//Sera accessible via req.body   ou req.bodè si t'es de Liège :p
	bodyParser = require('body-parser'),
	//permet l'envoie et la reception de cookie
	cookieParser = require('cookie-parser'),
	//morgan pour le débug 'facile'
	morgan = require('morgan'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler');
module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyparser.json());
	app.use(methodOverride());
	app.use(cookieParser('MaSuperCleSecrete007'));
	//indique que l'on utilise un router avec l'app
	routes(app);
	//Permet d'avoir un folder pour les asset statiques (js, images, html...)
	app.use('/public/', express.static(path.join(__dirname,
		'../public')));
	if ('development' === app.get('env')) {
		app.use(errorHandler());
	}
	return app;
};
