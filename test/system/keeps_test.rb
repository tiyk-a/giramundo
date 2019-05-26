require "application_system_test_case"

class KeepsTest < ApplicationSystemTestCase
  setup do
    @keep = keeps(:one)
  end

  test "visiting the index" do
    visit keeps_url
    assert_selector "h1", text: "Keeps"
  end

  test "creating a Keep" do
    visit keeps_url
    click_on "New Keep"

    fill_in "Concert", with: @keep.concert_id
    fill_in "User", with: @keep.user_id
    click_on "Create Keep"

    assert_text "Keep was successfully created"
    click_on "Back"
  end

  test "updating a Keep" do
    visit keeps_url
    click_on "Edit", match: :first

    fill_in "Concert", with: @keep.concert_id
    fill_in "User", with: @keep.user_id
    click_on "Update Keep"

    assert_text "Keep was successfully updated"
    click_on "Back"
  end

  test "destroying a Keep" do
    visit keeps_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Keep was successfully destroyed"
  end
end
