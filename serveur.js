var express = require('express'),
	//Ou se trouvent les modules
 config = require('./serveur/configuration'),
	app = express();
mongoose = require('mongoose');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/vues');
 app = config(app);
mongoose.connect('mongodb://localhost/image-ondego');
mongoose.connection.on('open', function() {
	console.log('Mongoose connecte.');
});

app.get('/', function(req, res){
	res.send('Hello World');
});
app.listen(app.get('port'), function() {
	console.log('Server up: http://localhost:' + app.get('port'));
});
