var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	path = require('path');
var ImageSchema = new Schema({
	titre: { type: String },
	description: { type: String },
	filename: { type: String },
	vues: { type: Number, 'default': 0 },
	likes: { type: Number, 'default': 0 },
	timestamp: { type: Date, 'default': Date.now }
});
ImageSchema.virtual('uniqueId')
	.get(function() {
		return this.filename.replace(path.extname(this.filename), '');
	});
module.exports = mongoose.model('Image', ImageSchema);
