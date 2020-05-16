$(document).ready(() => {
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
});
