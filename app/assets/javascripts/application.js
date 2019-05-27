// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require underscore
//= requre jquery.sliderPro.min
//= require gmaps/google
//= require infinite-scroll.pkgd.min
//= require jquery-ui/datepicker
//= require autocomplete-rails
//= require turbolinks
//= require_tree .

if(typeof jQuery != "undefined"){ //jQueryの読み込み確認
    $(function(){
        alert('jQuery is ready.')
    });
}

//******************** ARTIST ********************
//******************** ARTIST ********************
// Artists#Show, refresh artists's concert info *** TM ***
$(function(){
  $('#findConcertButton').on('click', function(){
    var artistName = $('#artistName').text();
    // SHOW LOADING GIF
    dispLoading("PLEASE WAIT...");
    var key = gon.tm_key
    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistName + "&size=15&sort=date,asc&apikey=" + key,
      async:true,
      dataType: "json",
    }).done(async function (data){
        await console.log(data);
        if(data._embedded === undefined){
          // REMOVE LOADING GIF
          removeLoading();
        }else{
            ar = (data._embedded.events);
            for(var i = 0; i < ar.length; i ++){
              if(ar[i]._embedded !== undefined && ar[i]._embedded.venues[0] !== undefined && ar[i]._embedded.venues[0].location !== undefined){
                // POST
                await $.ajax({
                  type:"POST",
                  url:'/concerts',
                  dataType: "json",
                  data: { concert: {
                    concert_name: ar[i].name, source: ar[i].url, tm_id: ar[i].id, image: ar[i].images[0].url, origin: "Ticket Master",
                    date: ar[i].dates.start.dateTime, timezone: ar[i].dates.timezone
                  },
                  performers: {
                    artist: artistName
                    },
                  venue: {
                    name: ar[i]._embedded.venues[0].name, address: ar[i]._embedded.venues[0].address.line1,
                    latitude: ar[i]._embedded.venues[0].location.longitude, longitude: ar[i]._embedded.venues[0].location.longitude,
                    country: ar[i]._embedded.venues[0].country.name, city: ar[i]._embedded.venues[0].city.name, url: ar[i]._embedded.venues[0].url
                    }
                  }
                }).done((data, textStatus, jqXHR) => {
                  console.log('done', jqXHR.status);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                  console.log('fail', jqXHR.status);
                });
                // POST
              }else{
                // POST
                await $.ajax({
                  type:"POST",
                  url:'/concerts',
                  dataType: "json",
                  data: { concert: {
                    concert_name: ar[i].name, source: ar[i].url, tm_id: ar[i].id, image: ar[i].images[0].url, origin: "Ticket Master",
                    date: ar[i].dates.start.dateTime, timezone: ar[i].dates.timezone
                  },
                  performers: {
                    artist: artistName
                    },
                  venue: {
                    name: "TBC", address: "TBC", latitude: 40.748187, longitude: 74.0822967,
                    country: "United States Of America", city: "New York",
                    url: "https://www.msg.com/madison-square-garden?cmp=van_thegarden"
                    }
                  }
                }).done((data, textStatus, jqXHR) => {
                  console.log('done', jqXHR.status);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                  console.log('fail', jqXHR.status);
                });
                // POST
              }
            };
        };
        // REMOVE LOADING GIF
        removeLoading();
        window.location.reload();
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('fail', jqXHR.status);
        // REMOVE LOADING GIF
        removeLoading();
    });
  });
});


// END Artists#Show, refresh artists's concert info *** TM ***

// Artists#Show, refresh artists's concert info *** SK ***
$(function(){
  $('#findConcertButtonSK').on('click', function(){
    var artistName = $('#artistName').text();
    // SHOW LOADING GIF
    dispLoading("PLEASE WAIT...");
    var key = gon.sk_key
    $.ajax({
      type:"GET",
      url:"https://api.songkick.com/api/3.0/artists/mbid:" + gon.artist.mb_id + "/calendar.json?per_page=10&apikey=" + key,
      async:true,
      dataType: "json",
    }).done(async function (data){
      console.log(data);
      if(data.resultsPage.results.event === undefined){
        // REMOVE LOADING GIF
        removeLoading();
      }else{
        ar = (data.resultsPage.results.event);
        for(var i = 0; i < ar.length; i ++){
          // POST
            await $.ajax({
              type:"POST",
              url:'/concerts',
              dataType: "json",
              data: { concert: {
                concert_name: ar[i].displayName, source: ar[i].uri, tm_id: ar[i].id, origin: "Songkick",
                date: ar[i].start.datetime
              },
              performers: {
                artist: artistName
              },
              venue: {
                name: ar[i].venue.displayName, latitude: ar[i].venue.lat, longitude: ar[i].venue.lat,
                country: ar[i].venue.metroArea.country.displayName, city: ar[i].venue.metroArea.displayName, url: ar[i].venue.uri
              }
              }
            }).done((data, textStatus, jqXHR) => {
                console.log('done', jqXHR.status);

            }).fail((jqXHR, textStatus, errorThrown) => {
                console.log('fail', jqXHR.status);
                // REMOVE LOADING GIF
                removeLoading();
            });
        };
      };
            // POST
      // REMOVE LOADING GIF
      removeLoading();
      window.location.reload();
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('failed to get info', jqXHR.status);
        // REMOVE LOADING GIF
        removeLoading();
    });
  });
});
// END Artists#Show, refresh artists's concert info *** SK ***

// For ARTIST Edit
$(document).on('click', '.editArtist', function(){
  sel = $(this);
  inputArtist();
});

function inputArtist() {
  var artistName = '.listArtistName' + sel.val();
  var name = $(artistName).text();

  var artistMbId = '.listArtistMbid' + sel.val();
  var mbid = $(artistMbId).text();

  $('#artist_artist_name').val(name);
  $('#artist_mb_id').val(mbid);
}
// END ARTIST Edit

// Artists#Show Artist image select
$(document).on('click', '.concertImage', function(){
  sel = $(this);
  var src = $(sel).attr('src');
  $('#artist_artist_image').val(src);
  $('#selectedArtistImage').html("<image src='" + src + "', style='width:150px;, height: 100px;' %>");
});
// Artists#Show Artist image select

// Artists#Show GET LOCAL TIME
$(document).on('click', '#concertShowLocalTimeUpdate', function(){

  var lat = gon.venue.latitude
  var lng = gon.venue.longitude
  var datetimeStr = $('#concertShowDatetime').text();
  var datetime = Number(datetimeStr)
  var id = $('#concertShowId').text();
  var key = gon.tz_key

  if(datetime !== null && lat !== undefined && lng !== undefined){

      $.ajax({
        type:"GET",
        url:"http://api.timezonedb.com/v2.1/get-time-zone?key=" + key +"&format=json&by=position&lat=" +
              lat + "&lng=" + lng + "&time=" + datetime,
        async:true,
        dataType: "json",
      }).done(async function (data){
          await console.log(data);
          $('#concertShowLocalTimeTBC').text(data.formatted);
          $('#concertShowLocalTimeUpdate').addClass('hidden');

          // POST
          var post_to = "/concert/update_concert/" + id

          await $.ajax({
              type:"PATCH",
              url: post_to,
              dataType: "json",
              data: { concert: {
                local_date: data.formatted
                }
              }
          }).done((data, textStatus, jqXHR) => {
                console.log('done', jqXHR.status);

          }).fail((jqXHR, textStatus, errorThrown) => {
                console.log('fail', jqXHR.status);
          });
          // POST

      }).fail((jqXHR, textStatus, errorThrown) => {
           console.log('fail', jqXHR.status);
      });
  }else{
      alert('SOrry noT avaiLable...');
  };
});
// Artists#Show GET LOCAL TIME


/*
// ARTISTS#SHOW YOUTUBE
MOVED TO ARTISTS#SHOW PAGE
// ARTISTS#SHOW YOUTUBE
  */

// ARTISTS#INDEX SEARCHED ARTISTS SELECT
$(document).on('mouseover', '.showNext', function(){
  $(this).next().removeClass('hidden');
});
// ARTISTS#INDEX SEARCHED ARTISTS SELECT

// ARTISTS#INDEX ADD NEW ARTIST FUNCTION
$(document).on('click', '.foundArtistSave', function(){
  // SHOW LOADING GIF
  dispLoading("PLEASE WAIT...");
  var artistName = $(this).text();
  var mb_id = $(this).next().next().text();
  getYtThumb(artistName, mb_id);
});
// ARTISTS#INDEX ADD NEW ARTIST FUNCTION

// ARTISTS#SHOW ADD ARTISTS'S IMAGE FUNCTION (RESCUE as normally image could be found automatically)
$(document).on('click', '#findArtistImage', function(){
  var artistName = $('#artistName').text();
  var mb_id = $('#artistMbId').text();
  getYtThumb(artistName, mb_id);
  window.location.reload();
});
// ARTISTS#SHOW ADD ARTISTS'S IMAGE FUNCTION (RESCUE as normally image could be found automatically)

// YOUTUBE IMAGE FUNCTION
function getYtThumb(artistName, mb_id) {
  var key = gon.gg_key
    $.ajax({
      type:"GET",
      url:"https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=" + artistName + "&type=channel&key=" + key,
      async:true,
      dataType: "json",
    }).done(async function (data){
        await console.log(data);
        if(data.items[0].snippet.thumbnails.high !== undefined){
          var artistImg = (data.items[0].snippet.thumbnails.high.url);
        }else{
          var artistImg = (data.items[0].snippet.thumbnails.default.url);
        }
        // POST
          await $.ajax({
              type:"POST",
              url:'/artists',
              dataType: "json",
              data: { artist: {
                artist_name: artistName, artist_image: artistImg, mb_id: mb_id,
                }
              }
          }).done((data, textStatus, jqXHR) => {
                console.log('done', jqXHR.status);
                window.location.reload();

          }).fail((jqXHR, textStatus, errorThrown) => {
                console.log('fail', jqXHR.status);
                // REMOVE LOADING GIF
                removeLoading();
                window.location.reload();
          });
      // POST
    }).fail((jqXHR, textStatus, errorThrown) => {
         console.log('fail', jqXHR.status);
    });
}
// YOUTUBE IMAGE FUNCTION

// WATCH ARTIST#CREATE
$(document).on('click','.createWatch', function(){
  var clicked = $(this)
  var artist_id = $(this).children().val();

  $.ajax({
    type:"POST",
    url: '/add_watch_artist',
    dataType: "json",
    data: {watch_artist: {
      artist_id: artist_id
    }
    }
  }).done((data, textStatus, jqXHR) => {
    alert('successfully saved :)');
    $(clicked).html("<%= j(render partial: 'watch_artists/destroy_button', locals: {}) %>");
    // $(clicked).val('would be id');
    // $(clicked).removeClass('createWatch');
    // $(clicked).addClass('removeWatch');
  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert('E R R O R');
  });

});
// WATCH ARTIST#CREATE

// WATCH ARTIST#DESTROY
$(document).on('click','.destroyKeep', function(){
  var clicked = $(this)
  var concert_id = $(this).parent().val();
  var user_id = $('#userId').text();

  console.log(concert_id);
  console.log(user_id);

  $.ajax({
    type:"DELETE",
    url:'/keep',
    dataType: "json",
    data: { keep: {
      user_id: user_id, concert_id: concert_id
    }
    }
  }).done((data, textStatus, jqXHR) => {
    alert('successfully saved :)');
    $(clicked).css('color','white');
  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert('E R R O R');
  });

});
// WATCH ARTIST#DESTROY
//******************** ARTIST ********************
//******************** ARTIST ********************

//******************** FEED ********************
//******************** FEED ********************
// For Feed name Edit
$(function(){
  $('.editForm').on('click', async function(){
      sel = $(this);
      inputFeed();
    });
});

function inputFeed() {
  var feedName = '.feedName_' + sel.val();
  var name = $(feedName).text();

  var feedurl = '.feedUrl_' + sel.val();
  var url = $(feedurl).text();

  var feeddesc = '.feedDesc_' + sel.val();
  var desc = $(feeddesc).text();

  $('#feed_name').val(name);
  $('#feed_url').val(url);
  $('#feed_description').val(desc);
}
// END Feed name Edit
//******************** FEED ********************
//******************** FEED ********************

//******************** VENUE ********************
//******************** VENUE ********************
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
  $( "td:contains(TBC)").each(function(){
    var res = $(this).parent();
    $(this).toggleClass('activeBtn');
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

//******************** VENUE ********************
//******************** VENUE ********************


//******************** CONCERT ********************
//******************** CONCERT ********************
// For CONCERT Edit
$(function(){
  $('.editConcert').on('click', function(){
      sel = $(this);
      inputConcert();
  });
});

function inputConcert() {
  var concertName = '.concertName_' + sel.val();
  var name = $(concertName).text();

  var concertSource = '.concertSource_' + sel.val();
  var source = $(concertSource).text();

  var concertImage = '.concertImage_' + sel.val();
  var image = $(concertImage).text();

  var concertTm_id = '.concertTmId_' + sel.val();
  var tm_id = $(concertTm_id).text();

  var concertDate = '.concertDate_' + sel.val();
  var date = $(concertDate).text();

  var concertVenue = '.concertVenue_' + sel.val();
  var venue_id = $(concertVenue).text();

  var concertOrigin = '.concertOrigin_' + sel.val();
  var origin = $(concertOrigin).text();

  var concertPerformers = '.concertPerformer_' + sel.val();
  var artist_id = $(concertPerformers).text();

  $('#concert_concert_name').val(name);
  $('#concert_source').val(source);
  $('#concert_image').val(image);
  $('#concert_tm_id').val(tm_id);
  $('#concert_date').val(date);
  $('#concert_venue_id').val(venue_id);
  $('#concert_origin').val(origin);
  $('#performers_artist_id').val(artist_id);
}
// END CONCERT Edit

// For Concert#Show, to get info
$(function(){
  $('.concertDetailsButton').on('click', function(){
    var id = $('#concertId').text();
    var key = gon.tm_key
    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events/" + id + ".json?apikey=" + key,
      async:true,
      dataType: "json",
    }).done(function (data){
        console.log(data);
        var localTime = (data.dates.start.localTime)
        var localDate = (data.dates.start.localDate);
        var dateTime = (data.dates.start.dateTime);
        var timezone = (data.dates.timezone);
        var venue_id = (data._embedded.venues[0].id);
        var venue_name = (data._embedded.venues[0].name);

        $('#concertDetails').append('<p>' + localTime + '</p>' + localDate + '</p>' + dateTime + '</p>'
          + timezone + '</p>' + venue_id + '</p>' + venue_name + '</p>');
        $('#concert_local_time').val(localTime);
        $('#concert_local_date').val(localDate);
        $('#concert_date').val(dateTime);
        $('#concert_timezone').val(timezone);
        $('#concert_tm_venue_id').val(venue_id);
    }).fail(function () {
        alert('Error happend');
    });

  });
});
// END For Concert#Show, to get info


// Concerts#index Activate Plan Function
$(document).on('click', '#planBtn', function(){
  $('.planColumn').toggle();
  $('.planColumnHeader').toggle();
  $('li').toggleClass('planHover');

  var $listSort = $('#swichWindow');
  if ($listSort.attr('rules')) {
    $listSort.removeAttr('rules');
  }else{
    $listSort.attr('rules', 'rows');
  }
});
// Concerts#index Activate Plan Function

// Concerts#index Plan Highlight
$(document).on('click', '.plan', function(){

  // SET reguration hours
  var dateText = $(this).next().text();
  var dateInt = Number(dateText);
  var fromDate = dateInt - 30
  var fromInt = Number(fromDate);
  var toDate = dateInt + 30
  var toInt = Number(toDate);
  //reguration hours END

  //pick up reords
  $( ".datetime").each(function(){
    var obj = $(this);
    // compared date
    var res = $(obj).text();
    var resInt = Number(res);
    // compared date END
    console.log(fromInt + "<" + res + "<" + toInt);
    compareDate(res, fromInt, toInt, obj);
   });

  // HIGHLIGHT ROW
  $(this).parent().toggleClass('highlight2');
});

function compareDate(root, from, to, column) {
  var rootN = Number(root);
  var fromN = Number(from);
  var toN = Number(to);

  if(rootN >= fromN && rootN <= toN){
    $(column).parent().toggleClass('highlight1');
    var parent = $(column).parent().html();
  };
};
// Concerts#index Plan Highlight

// Concerts#index modal menu
$(document).on('click', '#userModalBtn', function(){
  if($('#userModal').is(':hidden')){
    $('#userModal').slideDown();
  }else{
    $('#userModal').slideUp();
  }
});
// Concerts#index modal menu

//Concerts#index JUMP TO THE INPUTTED DATE!
$(document).on('click', '#dateFind', function(){
  var from = '#' + $('#fromDate').val();
  var to = '.' + $('#toDate').val();
  console.log(from + to);
  jump(from);
  highlihghtConcerts(from, to);
  console.log('done');
});

function jump(scrollTo){
  var speed = 500;
  var target = $(scrollTo == "#" || scrollTo == "" ? 'html' : scrollTo);
  var position = target.offset().top;
  $("html, body").animate({scrollTop:position}, speed, "swing");
  return false;
};

function highlihghtConcerts(startDate, toDate){
  $(startDate).addClass('highlight2');
  if(toDate !== null){
    $(toDate).addClass('highlight2');
  }else{

  };
};
//Concerts#index JUMP TO THE INPUTTED DATE!

// SLIDE SHOW
$( document ).ready(function( $ ) {
  $( '#my-slider' ).sliderPro({
    width: 800,
    height: 500,
    orientation: 'vertical',
    loop: false,
    arrows: false,
    buttons: false,
    thumbnailsPosition: 'right',
    thumbnailPointer: true,
    thumbnailArrows: false,
    thumbnailWidth: 300,
    breakpoints: {
      800: {
        thumbnailsPosition: 'bottom',
        thumbnailWidth: 270,
        thumbnailHeight: 100
      },
      500: {
        thumbnailsPosition: 'bottom',
        thumbnailWidth: 120,
        thumbnailHeight: 50
      }
    }
  });
});
  //http://bqworks.com/slider-pro/#example5
  //https://github.com/bqworks/slider-pro/blob/master/docs/modules
  // SLIDE SHOW

// KEEPS#CREATE
$(document).on('click','.createKeep', function(){
  var clicked = $(this)
  var concert_id = $(this).parent().val();
  var user_id = $('#userId').text();

  $.ajax({
    type:"POST",
    url:'/keeps',
    dataType: "json",
    data: { keep: {
      user_id: user_id, concert_id: concert_id
    }
    }
  }).done((data, textStatus, jqXHR) => {
    alert('successfully saved :)');
    console.log(data);
    $(clicked).css('color','deeppink');
    $(clicked).val('would be id');
    $(clicked).removeClass('createKeep');
    $(clicked).addClass('removeKeep');

  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert('E R R O R');
  });

});
// KEEPS#CREATE

// KEEPS#DESTROY
$(document).on('click','.destroyKeep', function(){
  var clicked = $(this)
  var concert_id = $(this).parent().val();
  var user_id = $('#userId').text();

  console.log(concert_id);
  console.log(user_id);

  $.ajax({
    type:"DELETE",
    url:'/keep',
    dataType: "json",
    data: { keep: {
      user_id: user_id, concert_id: concert_id
    }
    }
  }).done((data, textStatus, jqXHR) => {
    alert('successfully saved :)');
    $(clicked).css('color','white');
  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert('E R R O R');
  });

});
// KEEPS#DESTROY
//******************** CONCERT ********************
//******************** CONCERT ********************



//******************** GENERAL ********************
//******************** GENERAL ********************
// AJAX TRANSACTING *** START ***
function dispLoading(msg){
  if( msg == undefined ){
    msg = "";
  }
  var dispMsg = "<div class='loadingMsg'>" + msg + "</div>";

  if($("#loading").length == 0){
    $("body").append("<div id='loading'>" + dispMsg + "</div>");
  }
}

// TO *** FINISH *** AJAX TRANSACTING
function removeLoading(){
  $("#loading").fadeOut("slow");
}
//REFERENCE ---> https://webllica.com/jquery-now-loading/
// AJAX TRANSACTING

// GOOGLE MAP
function initMap(mapId, latCenter, lngCenter, markerSources, zoomSize) {
  var map = new google.maps.Map(document.getElementById(mapId), {
    zoom: zoomSize,
    center: { lat: latCenter, lng: lngCenter }
  });

  // CENTER MARKER
  // var centerContentString = "Here"

  var marker = new google.maps.Marker({
    position: { lat: latCenter, lng: lngCenter},
    title: 'test',
    map: map
  });

  // var infowindow = new google.maps.InfoWindow();
  // google.maps.event.addListener(marker, 'mouseover', (function(marker) {
  //  return function() {
  //    infowindow.setContent(centerContentString);
  //    infowindow.open(map, marker);
  //      }
  // })(marker));
  // CENTER MARKER

  var markers = []

  // MARKERS FOR INDEX PAGES
    for(var i = 0; i < markerSources.length; i++){
      console.log(markerSources[i].name)
      var markerEle = [markerSources[i].name, markerSources[i].latitude, markerSources[i].longitude, markerSources[i].id, markerSources[i].url]
      markers.push(markerEle);
    }

    for (var i = 0; i < markers.length; i++) {
      createMarker(
          markers[i][0],
          markers[i][1],
          markers[i][2],
          markers[i][3],
          markers[i][4],
          map,
      );
    }

  function createMarker(name,lat,lng,id,url,map){
    var latlng = new google.maps.LatLng(lat,lng);
    var pixelOffset = new google.maps.Size(0, -40);

    var marker = new google.maps.Marker({
      position: latlng,
      map: map});

    var hoverinfo = [];

    var content_full = "<h3><a href='http://localhost:3000/venues/" + id + "' style='color:black;' target='_blank;'>" + name + "</a></h3>" +
    "<p><a href='" + url + "' style='color:black;'>View External Cite</a></p>"

    // マーカーにマウスを乗せたときのイベント
    marker.addListener('click', function() {

      // infoの位置
      hoverinfo = new google.maps.InfoWindow({
        map: map,
        content: content_full,
        noSuppress: true,
        pixelOffset: pixelOffset
      });

        hoverinfo.setPosition(
          latlng
      );

      //マーカーからマウスを降ろしたときのイベント
      // marker.addListener('mouseout', function() {
      //     if(hoverinfo)
      //         hoverinfo.close();
      // });
    });
  }
    // MARKERS FOR INDEX PAGES
};
// GOOGLE MAP

// GOOGLE MAP SEARCH BY TEXT
function codeAddress(inputAddress, mapId){
  // // 入力を取得
  // let inputAddress = document.getElementById('address').value;

  var map = new google.maps.Map(document.getElementById(mapId), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  geocoder = new google.maps.Geocoder();
  // geocodingしたあとmapを移動
  geocoder.geocode( { 'address': inputAddress}, function(results, status) {
    if (status == 'OK') {
　　　　　　　　　　　　// map.setCenterで地図が移動
      map.setCenter(results[0].geometry.location);

　　　　　　　　　　　　// google.maps.MarkerでGoogleMap上の指定位置にマーカが立つ
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};
// GOOGLE MAP SEARCH BY TEXT

// CALENDER
$(function() {
  var from = $( "#fromDate" ).datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true
  }).on( "change", function() {
    to.datepicker( "option", "minDate", getDate( this ) );
  }),to = $( "#toDate" ).datepicker({
  dateFormat: "yy-mm-dd",
  changeMonth: true
  }).on( "change", function() {
    from.datepicker( "option", "maxDate", getDate( this ) );
  });

  function getDate( element ) {
    var date;
    var dateFormat = "yy-mm-dd";
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }
    return date;
  }
});

$(document).on('click', function(e) {
  // ２．クリックされた場所の判定
  if(!$(e.target).closest('#loginView').length && !$(e.target).closest('#logInBtn').length){
      $('#loginView').fadeOut();
  }else if($(e.target).closest('#logInBtn').length){
    // ３．ポップアップの表示状態の判定
    if($('#loginView').is(':hidden')){
        $('#loginView').fadeIn();
    }else{
        $('#loginView').fadeOut();
    }
  }
});
// CALENDER

//CLICK AND JAMP
$(function(){
  $('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});
//CLICK AND JAMP


//******************** HEADER ********************
//******************** HEADER ********************
// HEADER SCROLL
function init() {
  // スクロールして何ピクセルでアニメーションさせるか
  var px_change   = 20;

  // スクロールのイベントハンドラを登録
  window.addEventListener('scroll', function(e){
    // 変化するポイントまでスクロールしたらクラスを追加
    if ( $(window).scrollTop() > px_change ) {
      $("#nav, #navnormal").addClass("header-logo-small");

    // 変化するポイント以前であればクラスを削除
    } else if ( $("#nav, #navnormal").hasClass("header-logo-small") ) {
      $("#nav, #navnormal").removeClass("header-logo-small");
    }
  });
}
window.onload = init();
// HEADER SCROLL

// HEADER NAV
$(document).on('click', '#navBtn', function(){
  if($('#nav1').is(':hidden')){
    $('.nav-items').removeClass('hidden');
  }else{
    $('.nav-items').addClass('hidden');
  }
});
// HEADER NAV

//
$(document).on('hover', '#nav1', function(){
    $('#menu').html('<p>Concerts</p>');
  });
//
//******************** HEADER ********************
//******************** HEADER ********************

//******************** FOOTER ********************
//******************** FOOTER ********************
// FOOTER ADMIN NAV
$(document).on('click', '#adminNavBtn', function(){
  if($('#adminNav1').is(':hidden')){
    $('.adm-nav-items').removeClass('hidden');
  }else{
    $('.adm-nav-items').addClass('hidden');
  }
});
// FOOTER ADMIN NAV
//******************** FOOTER ********************
//******************** FOOTER ********************