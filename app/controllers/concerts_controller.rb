class ConcertsController < ApplicationController
  protect_from_forgery :except => [:create, :sort, :update_concert, :show]
  before_action :set_concert, only: [:show, :update, :destroy]
  before_action :set_admin, only: [:edit]

  # GET /concerts
  # GET /concerts.json
  def index
    if Concert.full.limit(10).present?
      @focuses = Concert.full.order("RANDOM()").limit(10).includes(:venue)
    end
    @concerts = Concert.full.page(params[:page]).order('date ASC').includes(:venue)
    @keep = Keep.new
    @entries = Entry.limit(5).order('id DESC').includes(:feed)
    @top_entries = Entry.where.not(artist_id: nil).limit(5).order('id DESC').includes(:artist, :feed)
    @concert = Concert.new
    @artists = Artist.all
    @venues = Venue.all.order('name asc')
    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET /concerts/1
  # GET /concerts/1.json
  def show
    @artists = Artist.all
    @venues = Venue.all
    gon.venue = set_concert.venue
    p ENV['TimeZone']
    gon.tz_key = ENV['TimeZone']
    @keep = Keep.new
  end

  # POST /concerts
  # POST /concerts.json
  def create
    if concert_params[:origin] == "manual"
      c = Concert.find_or_create_by(concert_name: concert_params[:concert_name], local_date: concert_params[:local_date])
      c.update(concert_params)
      artist = Artist.find(performers_params[:artist_id])
      Performer.find_or_create_by(artist_id: artist.id, concert_id: c.id)
    elsif concert_params[:origin] == "Ticket Master"
      c = Concert.find_or_create_by(tm_id: concert_params[:tm_id])
      c.update(concert_params)
      # No Artist No Concert. There's No Exception.
      artist = Artist.find_by(artist_name: performers_params[:artist])
    elsif concert_params[:origin] == "Songkick"
      c = Concert.find_or_create_by(tm_id: concert_params[:tm_id], origin: 'Songkick')
      c.update(concert_params)
      artist = Artist.find_by(artist_name: performers_params[:artist])
    end

    if c.date.blank?
      c.date = "TBC"
      c.save
    end

    Performer.find_or_create_by(artist_id: artist.id, concert_id: c.id)

    venue = Venue.find_or_create_by(name: venue_params[:name])
    venue.update(venue_params)

    if venue.address.blank?
      geocoder = Geocoder.search(venue_params[:name])
      if geocoder.present?
        if geocoder.first.address.present?
          venue.address = geocoder.first.address
        end
      end
      venue.address = "TBC"
    end

    if venue.country.blank?
      geocoder = Geocoder.search(venue_params[:name])
      if geocoder.present?
        if geocoder.first.country.present?
          venue.country = geocoder.first.country
        end
      end
      venue.country = "TBC"
    end

    if venue.city.blank?
      geocoder = Geocoder.search(venue_params[:name])
      if geocoder.present? && geocoder.first.city.present?
        venue.city = geocoder.first.city
      else
        venue.city = "TBC"
      end
    end
    venue.save

    if c.venue_id.blank?
      c.venue_id = venue.id
      c.save
    end

    respond_to do |format|
      format.html { redirect_to concerts_url, notice: 'Concert was successfully saved.' }
      format.json { head :no_content }
    end
  end

  def update_concert
    @concert = Concert.find(params[:id])
    @concert.update(concert_params)
    redirect_to concert_path(@concert)
  end

  # DELETE /concerts/1
  # DELETE /concerts/1.json
  def destroy
    @concert.destroy
    respond_to do |format|
      format.html { redirect_to concerts_url, notice: 'Concert was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def admin
      # RECORDS THAT LACK ANY COLUMNS WOULD BE SHOWN
    @concert_blanks = Concert.all - Concert.full
    @venue_blanks = Venue.all - Venue.details
    @artist_blanks = Artist.all - Artist.full
    @past_concerts = Concert.only_deleted.order('deleted_at DESC').page(params[:past_concert]).per(5)
    if params[:past_concert].present?
      render :file => "/app/views/concerts/past_concert.js.erb"
    end
    @artists = Artist.all
    @keep = Keep.new
    @concert = Concert.new
    @venues = Venue.all
  end

  def sort
    @keep = Keep.new
    if params[:id] == "1"
      @concerts = Concert.full.page(params[:page]).order('date asc').includes(:performers)
      render :file => "/app/views/concerts/sort_1.js.erb"
    elsif params[:id] == "2"
      @concerts = Concert.full.page(params[:page]).order('date desc').includes(:performers)
      render :file => "/app/views/concerts/sort_2.js.erb"
    elsif params[:id] == "3"
      @concerts = Concert.full.page(params[:page]).includes(:venue).order('venues.country DESC')
      render :file => "/app/views/concerts/sort_3.js.erb"
    elsif params[:id] == "4"
      @concerts = Concert.full.page(params[:page]).includes(:venue).order('venues.city DESC')
      render :file => "/app/views/concerts/sort_4.js.erb"
    elsif params[:id] == "5"
      @concerts = Concert.full.page(params[:page]).includes(:venue).order('venues.name DESC')
      render :file => "/app/views/concerts/sort_5.js.erb"
    end
  end

  def simple_sort
    @keep = Keep.new
    if params[:id] == "1"
      @concerts = Concert.page(params[:page]).per(100).order('date asc').includes(:performers)
      render :file => "/app/views/concerts/simple_sort.js.erb"
    elsif params[:id] == "2"
      @concerts = Concert.page(params[:page]).per(100).order('date desc').includes(:performers)
      render :file => "/app/views/concerts/simple_sort.js.erb"
    end
  end

  def switch
    if params[:id] == "1"
      @concerts = Concert.where.not(date: nil).page(params[:page]).per(100).order('date ASC').includes(:performers)
      render :file => "/app/views/concerts/switch_simple.js.erb"
    elsif params[:id] == "2"
      @concerts = Concert.page(params[:page]).includes(:performers).order('date asc')
      render :file => "/app/views/concerts/switch_basic.js.erb"
    end
    @keep = Keep.new
  end

  def date_check
    concerts = Concert.all.includes(:keep)
    concerts.each do |c|
      if c.date.present? && c.date.to_date.past?
        c.destroy
      end
    end
    @concerts = Concert.only_deleted.where(["deleted_at >= ?", DateTime.now - 3.minutes])
    render :file => "/app/views/concerts/date_check.js.erb"
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_concert
    @concert = Concert.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def concert_params
    params.require(:concert).permit(:concert_name, :source, :done, :image, :tm_id, :local_date, :date, :timezone, :venue_id, :origin)
  end

  def performers_params
    params.require(:performers).permit(:artist, :artist_id)
  end

  def venue_params
    params.require(:venue).permit(:name, :latitude, :longitude, :country, :city, :url, :address)
  end
end
