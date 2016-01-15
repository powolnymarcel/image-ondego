$(function(){

	$('#post-comment').hide();

	$('#btncomment').on('click', function(event) {
		event.preventDefault();
		$('#post-comment').show();
	});


	$('#btn-like').on('click', function(event) {
		event.preventDefault();
		var imgId = $(this).data('id');
		$.post('/images/' + imgId + '/like').done(function(data) {
			$('.likes-count').text(data.likes);
		});
	})



	$('#btn-delete').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		var remove = confirm('Etes vous sur de vouloir supprimer l\'image ?');
		if (remove) {
			var imgId = $(this).data('id');
			$.ajax({
				url: '/images/' + imgId,
				type: 'DELETE'
			}).done(function(result) {
				if (result) {
					$this.removeClass('btn-danger').addClass('btnsuccess');
					$this.find('i').removeClass('fa-times').
					addClass('fa-check');
					$this.append('<span> Supprimée!</span>');
				}
			});
		}
	});






});
