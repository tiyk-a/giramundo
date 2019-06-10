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
//= require jquery-ui
//= require jquery-ui/datepicker
//= require autocomplete-rails
//= require turbolinks
//= require_tree .

// if(typeof jQuery != "undefined"){ //jQueryの読み込み確認
//     $(function(){
//         alert('jQuery is ready.')
//     });
// }

//******************** HEADER ********************
//******************** HEADER ********************
// HEADER NAV
$(document).on('click', '#navBtn', function(){
  if($('#nav1').is(':hidden')){
    $('.nav-items').removeClass('hidden');
  }else{
    $('.nav-items').addClass('hidden');
    $('#menu').html('<i class="fas fa-bars fa-3x"></i>');
  }
});
// HEADER NAV

// BTN1
$(document).on('mouseover', '#nav1', function(){
    $('#menu').html('<h3>CONCERTS</h3>');
  });
// BTN1
// BTN2
$(document).on('mouseover', '#nav2', function(){
    $('#menu').html('<h3>ARTISTS</h3>');
  });
// BTN2
// BTN3
$(document).on('mouseover', '#nav3', function(){
    $('#menu').html('<h3>VENUES</h3>');
  });
// BTN3
// BTN4
$(document).on('mouseover', '#nav4-1', function(){
    $('#menu').html('<h3>KEEPS</h3>');
  });
// BTN4
// BTN4-2
$(document).on('mouseover', '#nav4-2', function(){
    $('#menu').html('<h3>LOG IN</h3>');
  });
// BTN4-2
// BTN5
$(document).on('mouseover', '#nav5-1', function(){
    $('#menu').html('<h3>LOG OUT</h3>');
  });
// BTN5
// BTN5-2
$(document).on('mouseover', '#nav5-2', function(){
    $('#menu').html('<h3>About</h3>');
  });
// BTN5-2

// SP MENU
$(function(){
  $('#menuToggle').on('click', function(){
    if($(this).hasClass('hamburger-active')){
      $(this).removeClass('hamburger-active');
      $('#sp-menu').fadeOut();
      return false;
    }else{
      $(this).addClass('hamburger-active');
      $('#sp-menu').fadeIn();
      return false;
    }
  });
});
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
    $('#adminNavBtn').html('<h3 style="font-size: 18px; padding: 5px 10px 5px 0; color: black; margin-top:55px;">ADMIN</h3>');
  }
});
// FOOTER ADMIN NAV

// BTN1
$(document).on('mouseover', '#adminNav1', function(){
    $('#adminNavBtn').html('<h3 style="font-size:18px; padding: 5px 10px 5px 0; color: black; margin-top:55px;">CONCERTS</h3>');
  });
// BTN1
// BTN2
$(document).on('mouseover', '#adminNav2', function(){
    $('#adminNavBtn').html('<h3 style="font-size:18px; padding: 5px 10px 5px 0; color: black; margin-top:55px;">ARTISTS</h3>');
  });
// BTN2
// BTN3
$(document).on('mouseover', '#adminNav3', function(){
    $('#adminNavBtn').html('<h3 style="font-size: 18px; padding: 5px 10px 5px 0; color: black; margin-top:55px;">Admin</h3>');
  });
// BTN3
// BTN4
$(document).on('mouseover', '#adminNav4', function(){
    $('#adminNavBtn').html('<h3 style="font-size:18px; padding: 5px 10px 5px 0; color: black; margin-top:55px;">USERS</h3>');
  });
// BTN4
// BTN5
$(document).on('mouseover', '#adminNav5', function(){
    $('#adminNavBtn').html('<h3 style="font-size:18px; padding: 5px 10px 5px 0; color: black; margin-top:55px;">LOG OUT</h3>');
  });
// BTN5

// SP ADMIN MENU
$(function(){
  $('#adminSpNavBtn').on('click', function(){
    if($(this).hasClass('admin-ham-active')){
      $(this).removeClass('admin-ham-active');
      $('#sp-admin-menu').fadeOut();
      return false;
    }else{
      $(this).addClass('admin-ham-active');
      $('#sp-admin-menu').fadeIn();
      return false;
    }
  });
});
//******************** FOOTER ********************
//******************** FOOTER ********************

//******************** GENERAL ********************
//******************** GENERAL ********************
//  *** START LOADING ***
function dispLoading(msg){
  if( msg == undefined ){
    msg = "";
  }
  var dispMsg = "<div class='loadingMsg'>" + msg + "</div>";

  if($("#loading").length == 0){
    $("body").append("<div id='loading'>" + dispMsg + "</div>");
  }
}
//  *** START LOADING ***

// *** FINISH LOADING ***
function removeLoading(){
  $("#loading").fadeOut("slow");
}
//REFERENCE ---> https://webllica.com/jquery-now-loading/
// *** FINISH LOADING ***

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
    "<p><a href='" + url + "' style='color:black; border-bottom: black solid 0.5px;' target='_blank'>Official Web<span style='color:black; padding: 0 5px;'><i class='fas fa-external-link-alt fa-xs'></i></span></a></p>"

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

// LOGIN ALERT
$(document).on('click', '.loginAlert', function(){
  $('#loginAlertModal').toggleClass('hidden');
});
// LOGIN ALERT
