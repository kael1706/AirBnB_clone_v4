$(document).ready(() => {
  /* Checkbox for amenities */
  const amenityDict = {};
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
  $.get('http://0.0.0.0:5001/api/v1/status', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') $('#api_status').addClass('avalible'); else $('#api_status').removeClass('avalible');
    }
  });
  /* End Request for status api */
  /* Show places dynamic mode */
  // Falta implementar la busqueda de usuarios para el owner.
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (places) {
      places.forEach(place => {
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
          
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`;
        $('.places').append(html);
      });
    }
  });
  /* */

  /* End Show places dynamic mode */
});
