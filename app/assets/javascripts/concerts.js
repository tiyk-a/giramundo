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
    var key = gon.tz_key
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

$(document).on('click', '#dateFindClear', function(){
  $("li").removeClass('highlight2');
  $("li").removeClass('highlight1');
});
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
    $(clicked).css('color','#E6C3D5');
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