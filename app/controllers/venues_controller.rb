class VenuesController < ApplicationController
  def index
    @venues = Venue.all
    @venue = Venue.new
    gon.venues = Venue.all
  end

  def create
    if venue_params[:name].present?
      venue = Venue.find_or_create_by(name: venue_params[:name])
      venue.update(venue_params)
    end
    redirect_to venues_path
  end

  def show
    @venue = Venue.find(params[:id])
    gon.venue = Venue.find(params[:id])
    @keep = Keep.new
    @artists = Artist.all
    @newVenue = Venue.new
  end

  def refresh
    venues = Venue.all
    venues.each do |venue|
      if venue.address.blank?
        geocoder = Geocoder.search(venue.name)
        if geocoder.present?
          venue.address = geocoder.first.address
        else
          venue.address = "TBC"
        end
      end

      if venue.country.blank?
        geocoder = Geocoder.search(venue.name)
        if geocoder.present?
          venue.country = geocoder.first.country
        else
          venue.country = "TBC"
        end
      end

      if venue.city.blank?
        geocoder = Geocoder.search(venue.name)
        if geocoder.present?
          venue.city = geocoder.first.city
        else
          venue.country = "TBC"
        end
      end
      venue.save
    end
    redirect_to venues_path
  end

  def destroy
    @venue = Venue.find(params[:id])
    @venue.destroy
    respond_to do |format|
      format.html { redirect_to venues_url, notice: 'Venue was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def sort
    gon.venues = Venue.all
    if params[:id] == "1"
      @venues = Venue.all.order('country asc')
      render :file => "/app/views/venues/sort.js.erb"
    elsif params[:id] == "2"
      @venues = Venue.all.order('name asc')
      render :file => "/app/views/venues/sort_2.js.erb"
    end
  end

  private

  def venue_params
    params.require(:venue).permit(:name, :latitude, :longitude, :country, :city, :address, :url, :origin)
  end
end
