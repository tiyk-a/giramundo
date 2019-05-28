// For Venue Edit
$(function(){
  $('.editVenue').on('click', function(){
    sel = $(this);
    inputVenue();
    });
});

function inputVenue() {
  var venueName = '.venueName_' + sel.val();
  var name = $(venueName).text();

  var venueCountry = '.venueCountry_' + sel.val();
  var country = $(venueCountry).text();

  var venueCity = '.venueCity_' + sel.val();
  var city = $(venueCity).text();

  var venueAddress = '.venueAddress_' + sel.val();
  var address = $(venueAddress).text();

  var venueOrigin = '.venueOrigin_' + sel.val();
  var origin = $(venueOrigin).text();

  var venueLat = '.venueLat_' + sel.val();
  var latitude = $(venueLat).text();

  var venueLng = '.venueLng_' + sel.val();
  var longitude = $(venueLng).text();

  $('#venue_name').val(name);
  $('#venue_country').val(country);
  $('#venue_city').val(city);
  $('#venue_address').val(address);
  $('#venue_origin').val(origin);
  $('#venue_latitude').val(latitude);
  $('#venue_longitude').val(longitude);
}
// END Venue Edit

// Venues#index Find "TBC"
$(function(){
  $('#pickupNotFound').on('click', function(){
    $(this).toggleClass('activeBtn');
    pickupNotFound();
  });
});

function pickupNotFound() {
  $( "span:contains(TBC)").each(function(){
    var res = $(this).parent();
    $(res).toggleClass('highlight2');
  });
}
// Venues#index Find "TBC"

// VENUES#SHOW REFRESH GOOGLE MAP INFO
$(document).on('click', '.GetMap', async function(){
    // SHOW LOADING GIF
    dispLoading("PLEASE WAIT...");

    var venue_name = gon.venue.name
    var venue_address = gon.venue.address
    var key = gon.gg_key

    if(venue_address !== "TBC"){
        console.log('SEARCHING WIZ ADDRESS');
        $.ajax({
          type:"GET",
          url:"https://maps.googleapis.com/maps/api/geocode/json?address=" + venue_address + "&key=" + key,
          async:true,
          dataType: "json",
        }).done(async function (data){
            await console.log(data);
            if(data.results[0].formatted_address !== undefined){
                // POST
              await $.ajax({
                  type:"POST",
                  url:'/venues',
                  dataType: "json",
                  data: {venue: {
                    name: venue_name, address: data.results[0].formatted_address,
                    latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng
                  }
                  }
              }).done((data, textStatus, jqXHR) => {
                  console.log('done', jqXHR.status);
              })
              .fail((jqXHR, textStatus, errorThrown) => {
                  console.log('fail', jqXHR.status);
                  // REMOVE LOADING GIF
                  removeLoading();
              });
                // POST
            };
            // REMOVE LOADING GIF
          removeLoading();
          window.location.reload();
        }).fail((jqXHR, textStatus, errorThrown) => {
          console.log('fail', jqXHR.status);
          // REMOVE LOADING GIF
          removeLoading();
          window.location.reload();
        });
    }else{
      console.log('SEARCHING WIZ VENUE NAME');
      $.ajax({
        type:"GET",
        url:"https://maps.googleapis.com/maps/api/geocode/json?address=" + venue_name + "&key=" + key,
        async:true,
        dataType: "json",
      }).done(async function (data){
        await console.log(data);
        if(data.results[0].formatted_address !== undefined){
            // POST
            await $.ajax({
              type:"POST",
              url:'/venues',
              dataType: "json",
              data: {venue: {
                name: venue_name, address: data.results[0].formatted_address,
                latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng
              }
              }
            }).done((data, textStatus, jqXHR) => {
              console.log('done', jqXHR.status);
            }).fail((jqXHR, textStatus, errorThrown) => {
              console.log('fail', jqXHR.status);
              // REMOVE LOADING GIF
              removeLoading();
            });
              // POST
        };
          // REMOVE LOADING GIF
        removeLoading();
        window.location.reload();
      }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('fail', jqXHR.status);
        // REMOVE LOADING GIF
        removeLoading();
        window.location.reload();
      });
    }
});
// VENUES#SHOW REFRESH GOOGLE MAP INFO

// LOCATION SEARCH (GEOCODE BOX)
function locationSearch(key) {
  var api_key = gon.gg_key
  $.ajax({
    type:"GET",
    url:"https://maps.googleapis.com/maps/api/geocode/json?address=" + key + "&key=" + api_key,
    async:true,
    dataType: "json",
  }).done(async function (data){
    await console.log(data);
    if(data.results[0] !== undefined && data.results[0].formatted_address !== undefined){
      $('#manualGeoCoderResult').removeClass('hidden');
      $('#geoCoderName').append('<p>'+ key +'"</p>');
      $('#geoCoderAddress').append('<p>'+ data.results[0].formatted_address +'</p>');
      $('#geoCoderLat').append('<p>'+ data.results[0].geometry.location.lat +'</p>');
      $('#geoCoderLng').append('<p>'+ data.results[0].geometry.location.lng +'</p>');
     };
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.log('fail', jqXHR.status);
    alert('Not Found');
  });
}
// LOCATION SEARCH (GEOCODE BOX)