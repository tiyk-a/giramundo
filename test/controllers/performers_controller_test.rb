require 'test_helper'

class PerformersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @performer = performers(:one)
  end

  test "should get index" do
    get performers_url
    assert_response :success
  end

  test "should get new" do
    get new_performer_url
    assert_response :success
  end

  test "should create performer" do
    assert_difference('Performer.count') do
      post performers_url, params: { performer: { artist_id: @performer.artist_id, concert_id: @performer.concert_id } }
    end

    assert_redirected_to performer_url(Performer.last)
  end

  test "should show performer" do
    get performer_url(@performer)
    assert_response :success
  end

  test "should get edit" do
    get edit_performer_url(@performer)
    assert_response :success
  end

  test "should update performer" do
    patch performer_url(@performer), params: { performer: { artist_id: @performer.artist_id, concert_id: @performer.concert_id } }
    assert_redirected_to performer_url(@performer)
  end

  test "should destroy performer" do
    assert_difference('Performer.count', -1) do
      delete performer_url(@performer)
    end

    assert_redirected_to performers_url
  end
end
