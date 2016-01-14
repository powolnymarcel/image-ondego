module.exports = {
	index: function(req, res) {
		var viewModel = {
			images: [
				{
					uniqueId: 1,
					titre: 'Sample Image 1',
					description: '',
					filename: 'sample1.jpg',
					vues: 0,
					likes: 0,
					timestamp: Date.now()
				}, {
					uniqueId: 2,
					titre: 'Sample Image 2',
					description: '',
					filename: 'sample2.jpg',
					vues: 0,
					likes: 0,
					timestamp: Date.now()
				}, {
					uniqueId: 3,
					titre: 'Sample Image 3',
					description: '',
					filename: 'sample3.jpg',
					vues: 0,
					likes: 0,
					timestamp: Date.now()
				}, {uniqueId: 4,
					titre: 'Sample Image 4',
					description: '',
					filename: 'sample4.jpg',
					vues: 0,
					likes: 0,
					timestamp: Date.now()
				}
			]
		};
		res.render('index', viewModel);
	}
};
