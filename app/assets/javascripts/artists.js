// Artists#Show, refresh artists's concert info *** TM ***
$(function(){
  $('#findConcertButton').on('click', function(){
    var artistName = $('#artistName').text();
    // SHOW LOADING GIF
    dispLoading("SEARCHING ...");
    var key = gon.tm_key
    $.ajax({
      type:"GET",
      url: gon.tm_url + ".json?keyword=" + artistName + "&size=15&sort=date,asc&apikey=" + key,
      async:true,
      dataType: "json",
    }).done(async function (data){
        await console.log(data);
        if(data._embedded === undefined){
          // REMOVE LOADING GIF
          removeLoading();
          searchRes("NOT FOUND");
        }else{
            dispLoading("CONFIRMING ...");
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
        searchRes("PLEASE WAIT ...");
        window.location.reload();
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('fail', jqXHR.status);
        // REMOVE LOADING GIF
        removeLoading();
        searchRes("NOT FOUND");
    });
  });
});

// END Artists#Show, refresh artists's concert info *** TM ***

// Artists#Show, refresh artists's concert info *** SK ***
$(function(){
  $('#findConcertButtonSK').on('click', function(){
    var artistName = $('#artistName').text();
    // SHOW LOADING GIF
    dispLoading("SEARCHING ...");
    var key = gon.sk_key
    $.ajax({
      type:"GET",
      url:gon.sk_url + gon.artist.mb_id + "/calendar.json?per_page=10&apikey=" + key,
      async:true,
      dataType: "json",
    }).done(async function (data){
      console.log(data);
      if(data.resultsPage.results.event === undefined){
        // REMOVE LOADING GIF
        removeLoading();
        searchRes("NOT FOUND NEW INFO :(");
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
                searchRes("NOT FOUND NEW INFO :(");
            });
        };
      };
            // POST
      // REMOVE LOADING GIF
      removeLoading();
      searchRes("PLEASE WAIT ...");
      window.location.reload();
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('failed to get info', jqXHR.status);
        // REMOVE LOADING GIF
        removeLoading();
        searchRes("NOT FOUND NEW INFO :(");
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

  var artistImg = '.listArtistImg' + sel.val();
  var img = $(artistImg).attr('src');

  $('#artist_artist_name').val(name);
  $('#artist_mb_id').val(mbid);
  $('#artist_artist_image').val(img);

  $('#inputtedArtistImage').html("<image src='" + img + "', style='width:150px;, height: 100px;' %>");
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
        url: gon.tz_url + key +"&format=json&by=position&lat=" +
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

// YOUTUBE IMAGE FUNCTION
  function getYtThumb(artistName, mb_id) {
    var key = gon.gg_key
    var next_id = gon.next_artist_id
    console.log(next_id);
      $.ajax({
        type:"GET",
        url: gon.yt_url + artistName + "&type=channel&key=" + key,
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
                  console.log(data, jqXHR.status);
                  var redirect_to = "/artists/" + next_id
                  removeLoading();
                  searchRes("PLEASE WAIT ...");
                  window.location.href = redirect_to;
            }).fail((jqXHR, textStatus, errorThrown) => {
                  console.log('fail', jqXHR.status);
                  var redirect_to = "/artists/" + next_id
                  removeLoading();
                  searchRes("NOT FOUND ...");
                  window.location.href = redirect_to;
            });
        // POST
      }).fail((jqXHR, textStatus, errorThrown) => {
        // POST
            $.ajax({
                type:"POST",
                url:'/artists',
                dataType: "json",
                data: { artist: {
                  artist_name: artistName, artist_image: "/images/no-portrait.png", mb_id: mb_id,
                  }
                }
            }).done((data, textStatus, jqXHR) => {
                  var redirect_to = "/artists/" + next_id
                  removeLoading();
                  searchRes("PLEASE WAIT ...");
                  window.location.href = redirect_to;
             }).fail((jqXHR, textStatus, errorThrown) => {
                  var redirect_to = "/artists/" + next_id
                  removeLoading();
                  searchRes("NOT FOUND ...");
                  window.location.href = redirect_to;
            });
        // POST
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