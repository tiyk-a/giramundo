class ArtistsController < ApplicationController
  protect_from_forgery :except => [:create, :index, :show]
  before_action :set_artist, only: [:show, :edit, :update, :destroy]
  before_action :set_admin, only: [:edit]
  before_action :authenticate_user!, only: [:index]
  autocomplete :artist, :artist_name, full: true
  # GEM https://github.com/peterwillcn/rails4-autocomplete
  # FRIENDLY REFERENCE: https://techblog.kyamanak.com/entry/2018/06/03/170603

  # GET /artists
  # GET /artists.json
  def index
    if (params.has_key?(:artist))
      if Artist.where(artist_name: artist_params[:artist_name]).present?
        @artists = Artist.where(artist_name: artist_params[:artist_name])
      else
        @artists = Artist.all.reverse_order
        require 'musicbrainz'
        @foundArtists = MusicBrainz::Artist.search(artist_params[:artist_name])
        # GEM GITHUB => https://github.com/localhots/musicbrainz
      end
    else
      @artists = Artist.all.reverse_order
    end
    @artist = Artist.new
  end

  # def id_refresh
  #   artists = Artist.where(mb_id: nil)
  #   require 'musicbrainz'
  #   artists.each do |a|
  #     @found = MusicBrainz::Artist.search(a.artist_name)
  #     if @found.present? && @found[0][:name] == a.artist_name
  #       a.mb_id = @found[0][:mbid]
  #     else
  #       a.mb_id = "TBC"
  #     end
  #     a.save
  #   end
  #   @artists = Artist.where(updated_at: Time.zone.now.beginning_of_day)
  #   render :file => "/app/views/artists/id_refresh.js.erb"
  # end

  # GET /artists/1
  # GET /artists/1.json
  def show
    @artist = Artist.find(params[:id])
    gon.artist = Artist.find(params[:id])
    @artists = Artist.all
    @venues = Venue.all
    @concert = Concert.new
    gon.sk_key = ENV['SK_API']
    gon.tm_key = ENV['TM_API']
  end

  # POST /artists
  # POST /artists.json
  def create
    artist = Artist.find_or_create_by(artist_name: artist_params[:artist_name])
    artist.update(artist_params)
    redirect_to artist_path(artist)
  end

  def update
    respond_to do |format|
      if @artist.update(artist_params)
        format.html { redirect_to @artist, notice: 'Artist was successfully updated.' }
        format.json { render :show, status: :ok, location: @artist }
      else
        format.html { render :edit }
        format.json { render json: @artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /artists/1
  # DELETE /artists/1.json
  def destroy
    @artist.destroy
    respond_to do |format|
      format.html { redirect_to artists_url, notice: 'Artist was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_artist
    @artist = Artist.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def artist_params
    params.require(:artist).permit(:artist_name, :artist_image, :deleted_at, :mb_id)
  end
end
