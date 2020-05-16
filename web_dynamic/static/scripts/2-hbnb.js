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
});
