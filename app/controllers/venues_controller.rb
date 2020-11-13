class VenuesController < ApplicationController

  # 会場一覧ページ
  def index
    @venues = Venue.all.includes({concerts: [{performers: [:artist]}]})
    @venue = Venue.new
    gon.venues = Venue.all
  end

  # 会場登録
  def create
    if venue_params[:name].present?
      venue = Venue.find_or_create_by(name: venue_params[:name])
      venue.update(venue_params)
    end
    redirect_to venue_path(venue)
  end

  # 会場詳細ページ
  def show
    @venue = Venue.find(params[:id])
    gon.venue = Venue.find(params[:id])
    @keep = Keep.new
    @artists = Artist.all
    @newVenue = Venue.new
  end

  #
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

  # 会場削除
  def destroy
    @venue = Venue.find(params[:id])
    @venue.destroy
    respond_to do |format|
      format.html { redirect_to venues_url, notice: 'Venue was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # 並び替え
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

  # 国を表示
  def conv
    @venues = Venue.all
    @venues.each do |v|
      if v.country.present?
        this = v.country
        if this.casecmp("UK") == 0 || this.include?("Great Britain")
          this = "GB"
        end
        if (ISO3166::Country[this]) != nil
          v.flag = (ISO3166::Country[this]).emoji_flag
        elsif (ISO3166::Country.find_country_by_alpha3(this)) != nil
          v.flag = (ISO3166::Country.find_country_by_alpha3(this)).emoji_flag
        elsif (ISO3166::Country.find_country_by_name(this)) != nil
          v.flag = (ISO3166::Country.find_country_by_name(this)).emoji_flag
        end
        v.save
      end
    end
    redirect_to venues_path
  end

  private

  def venue_params
    params.require(:venue).permit(:name, :latitude, :longitude, :country, :city, :address, :url, :origin)
  end
end
