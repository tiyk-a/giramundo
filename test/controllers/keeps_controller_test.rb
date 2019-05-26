require 'test_helper'

class KeepsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @keep = keeps(:one)
  end

  test "should get index" do
    get keeps_url
    assert_response :success
  end

  test "should get new" do
    get new_keep_url
    assert_response :success
  end

  test "should create keep" do
    assert_difference('Keep.count') do
      post keeps_url, params: { keep: { concert_id: @keep.concert_id, user_id: @keep.user_id } }
    end

    assert_redirected_to keep_url(Keep.last)
  end

  test "should show keep" do
    get keep_url(@keep)
    assert_response :success
  end

  test "should get edit" do
    get edit_keep_url(@keep)
    assert_response :success
  end

  test "should update keep" do
    patch keep_url(@keep), params: { keep: { concert_id: @keep.concert_id, user_id: @keep.user_id } }
    assert_redirected_to keep_url(@keep)
  end

  test "should destroy keep" do
    assert_difference('Keep.count', -1) do
      delete keep_url(@keep)
    end

    assert_redirected_to keeps_url
  end
end
