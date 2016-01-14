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
	errorHandler = require('errorhandler'),
	//Formattage date heure
	moment = require('moment'),
	//pour le upload
	multer = require('multer');

module.exports = function(app) {
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: [app.get('views') + '/partials'],
		helpers: {
			timeago: function(timestamp) {
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);
	app.set('view engine', 'handlebars');
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyParser.json());
	app.use(multer({ dest: path.join(__dirname,'public/upload/temp'),
		limits: {fileSize: 1000000, files:1}}).single('file'));
	app.use(methodOverride());
	app.use(cookieParser('MaSuperCleSecrete007'));

	//Permet d'avoir un folder pour les asset statiques (js, images, html...)
	app.use('/public/', express.static(path.join(__dirname,'../public')));
	if ('development' === app.get('env')) {
		app.use(errorHandler());
	}


//indique que l'on utilise un router avec l'app
	routes(app);



	return app;
};
