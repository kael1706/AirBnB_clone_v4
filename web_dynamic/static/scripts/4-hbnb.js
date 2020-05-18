$(document).ready(() => {
	/* Checkbox for amenities*/
	const amenityDict = {};
	const urlhost = 'http://0.0.0.0';
	const porthost = ':5001';/* :37297 for contaniners*/

	$('li input[type="checkbox"]').change(function () {
	  if ($(this).is(':checked')) {
		amenityDict[$(this).data('id')] = $(this).data('name');
	  } else {
		if (amenityDict[$(this).data('id')]) {
		  delete amenityDict[$(this).data('id')];
		}
	  }
	  const copy = Object.values(amenityDict);
	  $('.amenities h4').text(copy.join(', '));
	  if (copy.length === 0) $('.amenities h4').html('&nbsp;');
	});
	/* End Checkbox */
	/* Request for status api */
	$.get(urlhost + porthost + '/api/v1/status', function (data, status) {
	  if (status === 'success') {
		if (data.status === 'OK') $('#api_status').addClass('avalible'); else $('#api_status').removeClass('avalible');
	  }
	});
	/* End Request for status api */
	/* Show places dynamic mode wit filter*/

	ajaxCall1();

	function ajaxCall1(){
		$.ajax({
			type: 'POST',
			url: urlhost + porthost + '/api/v1/places_search/',
			data: '{}',
			dataType: 'json',
			contentType: 'application/json',
			success: function(places){
				ajaxCall2(places);
			}
		});
	}
	function ajaxCall2(places){
		$.ajax({
			type: 'GET',
			url: urlhost + porthost + '/api/v1/users/',
			data: '{}',
			dataType: 'json',
			contentType: 'application/json',
			success: function(users){
				setinfo(places, users);
			}
		});
	}

	function setinfo(places, users){
		let myuser = '';
		places.forEach(place => {
			myuser = '';
			users.forEach(user =>{
				if (user.id === place.user_id){
					myuser = user.first_name + ' ' + user.last_name;
				}
			});
			
			const s = (place.max_guest !== 1) ? 's' : '';
			const s2 = (place.number_rooms !== 1) ? 's' : '';
			const s3 = (place.number_bathrooms !== 1) ? 's' : '';
			const html = `<article>
			<div class="title_box">
			  <h2>${place.name}</h2>
			  <div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			  <div class="max_guest">${place.max_guest} Guest${s}</div>
			  <div class="number_rooms">${place.number_rooms}
				Bedroom${s2}</div>
			  <div class="number_bathrooms">${place.number_bathrooms}
				Bathroom${s3}</div>
			</div>
			<div class="user">
			<b>Owner:</b> ${ myuser }
			</div>
			<div class="description">
			  ${place.description}
			</div>
		  </article>`;
			$('.places').append(html);
		  });
	}

	function ajaxCall1b (){
		$.ajax({
			type: 'POST',
			url: urlhost + porthost + '/api/v1/places_search/',
			data: JSON.stringify({ amenities: Object.keys(amenityDict) }),
			dataType: 'json',
			contentType: 'application/json',
			success: function(places){
				ajaxCall2(places);
			}
		});
	}
	$('.filters > button').click(function (e) {
	  e.preventDefault();
	  $('article').remove();
	  ajaxCall1b();
	});
	/* End Show places dynamic mode with filter*/
  });
