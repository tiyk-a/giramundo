class EntriesController < ApplicationController
  before_action :set_feed, only: :index
  before_action :set_admin, only: [:all]

  def top
    artists = Artist.all
    entries = Entry.all
    entries.each do |entry|
      artists.each do |a|
        if entry.title.downcase.include?(a.artist_name.downcase)
          entry.artist_id = a.id
          entry.save
        end
      end
    end
    @entries = Entry.where.not(artist_id: nil).page(params[:page]).order('created_at desc')
  end

  def all
    @entries = Entry.page(params[:page]).order('created_at desc')
  end

  def index
    @entries = @feed.entries.page(params[:page]).order('created_at desc')
  end

  private

  def set_feed
    @feed = Feed.find(params[:id])
  end
end
