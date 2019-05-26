require "application_system_test_case"

class WatchArtistsTest < ApplicationSystemTestCase
  setup do
    @watch_artist = watch_artists(:one)
  end

  test "visiting the index" do
    visit watch_artists_url
    assert_selector "h1", text: "Watch Artists"
  end

  test "creating a Watch artist" do
    visit watch_artists_url
    click_on "New Watch Artist"

    fill_in "Artist", with: @watch_artist.artist_id
    fill_in "User", with: @watch_artist.user_id
    click_on "Create Watch artist"

    assert_text "Watch artist was successfully created"
    click_on "Back"
  end

  test "updating a Watch artist" do
    visit watch_artists_url
    click_on "Edit", match: :first

    fill_in "Artist", with: @watch_artist.artist_id
    fill_in "User", with: @watch_artist.user_id
    click_on "Update Watch artist"

    assert_text "Watch artist was successfully updated"
    click_on "Back"
  end

  test "destroying a Watch artist" do
    visit watch_artists_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Watch artist was successfully destroyed"
  end
end
