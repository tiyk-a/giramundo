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