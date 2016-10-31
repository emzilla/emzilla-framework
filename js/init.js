// Functions
// -----------------------


// Document Ready
// -----------------------

$(function() {

	// Set up Flickr API Key and NASA User ID
	var apiKey = 'a5e95177da353f58113fd60296e1d250';
	var userId = '24662369@N07';

	var requestUrl = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId + '&format=json&nojsoncallback=1&per_page=20';

	$.ajax({
		type: 'GET',
		url: requestUrl,
		dataType: 'json',
		beforeSend: function() {
			$('#loader').removeClass('visuallyhidden');
		},
		success: function(data) {
			$('#loader').addClass('visuallyhidden');

			var photoList = data.photos.photo;

			for (i = 0; i < photoList.length; i++) {

				// Img src url parts
				var farmId = photoList[i].farm;
				var server = photoList[i].server;
				var photoId = photoList[i].id;
				var photoSecret = photoList[i].secret;
				var title = photoList[i].title;

				// Create img src url
				var imageSrc = 'https://farm' + farmId + '.staticflickr.com/' + server + '/' + photoId + '_' + photoSecret + '_b.jpg';

				// Create Photo List Item
				var imageContainer = '<li class="thumbnail"><img src="' + imageSrc + '" alt="' + title + '"><span class="title">' + title + '</span></li>';

				// Append List Item with Image to UL
				$(imageContainer).appendTo('#photos');				
			}
		},
		complete: function() {
			
		},
		error: function() {
			$('#photolist').append('<li><p>Sorry, no images available at this time</p></li>');
		}
	});

});

$(document).ajaxComplete(function() {

	var newList = new List('photo-list-container', { 
	  valueNames: ['title'], 
	  plugins: [ ListFuzzySearch() ] 
	});

});