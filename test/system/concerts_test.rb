require "application_system_test_case"

class ConcertsTest < ApplicationSystemTestCase
  setup do
    @concert = concerts(:one)
  end

  test "visiting the index" do
    visit concerts_url
    assert_selector "h1", text: "Concerts"
  end

  test "creating a Concert" do
    visit concerts_url
    click_on "New Concert"

    fill_in "Concert name", with: @concert.concert_name
    fill_in "Date", with: @concert.date
    fill_in "Deleted at", with: @concert.deleted_at
    fill_in "Image", with: @concert.image
    fill_in "Local date", with: @concert.local_date
    fill_in "Origin", with: @concert.origin
    fill_in "Source", with: @concert.source
    fill_in "Timezone", with: @concert.timezone
    fill_in "Tm", with: @concert.tm_id
    fill_in "Venue", with: @concert.venue_id
    click_on "Create Concert"

    assert_text "Concert was successfully created"
    click_on "Back"
  end

  test "updating a Concert" do
    visit concerts_url
    click_on "Edit", match: :first

    fill_in "Concert name", with: @concert.concert_name
    fill_in "Date", with: @concert.date
    fill_in "Deleted at", with: @concert.deleted_at
    fill_in "Image", with: @concert.image
    fill_in "Local date", with: @concert.local_date
    fill_in "Origin", with: @concert.origin
    fill_in "Source", with: @concert.source
    fill_in "Timezone", with: @concert.timezone
    fill_in "Tm", with: @concert.tm_id
    fill_in "Venue", with: @concert.venue_id
    click_on "Update Concert"

    assert_text "Concert was successfully updated"
    click_on "Back"
  end

  test "destroying a Concert" do
    visit concerts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Concert was successfully destroyed"
  end
end
