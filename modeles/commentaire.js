var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var CommentaireSchema = new Schema({
	image_id: { type: ObjectId },
	email: { type: String },
	nom: { type: String },
	gravatar: { type: String },
	commentaire: { type: String },
	timestamp: { type: Date, 'default': Date.now }
});
CommentaireSchema.virtual('image').set(function(image){
	this._image = image;
}).get(function() {
	return this._image;
});
module.exports = mongoose.model('Commentaire', CommentaireSchema);
