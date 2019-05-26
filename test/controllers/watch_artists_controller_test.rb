require 'test_helper'

class WatchArtistsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @watch_artist = watch_artists(:one)
  end

  test "should get index" do
    get watch_artists_url
    assert_response :success
  end

  test "should get new" do
    get new_watch_artist_url
    assert_response :success
  end

  test "should create watch_artist" do
    assert_difference('WatchArtist.count') do
      post watch_artists_url, params: { watch_artist: { artist_id: @watch_artist.artist_id, user_id: @watch_artist.user_id } }
    end

    assert_redirected_to watch_artist_url(WatchArtist.last)
  end

  test "should show watch_artist" do
    get watch_artist_url(@watch_artist)
    assert_response :success
  end

  test "should get edit" do
    get edit_watch_artist_url(@watch_artist)
    assert_response :success
  end

  test "should update watch_artist" do
    patch watch_artist_url(@watch_artist), params: { watch_artist: { artist_id: @watch_artist.artist_id, user_id: @watch_artist.user_id } }
    assert_redirected_to watch_artist_url(@watch_artist)
  end

  test "should destroy watch_artist" do
    assert_difference('WatchArtist.count', -1) do
      delete watch_artist_url(@watch_artist)
    end

    assert_redirected_to watch_artists_url
  end
end
