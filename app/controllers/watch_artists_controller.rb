class WatchArtistsController < ApplicationController
  before_action :set_watch_artist, only: [:show, :edit, :update, :destroy]

  # GET /watch_artists
  # GET /watch_artists.json
  def index
    @watch_artists = WatchArtist.all
  end

  # GET /watch_artists/1
  # GET /watch_artists/1.json
  def show
  end

  # GET /watch_artists/new
  def new
    @watch_artist = WatchArtist.new
  end

  # GET /watch_artists/1/edit
  def edit
  end

  # POST /watch_artists
  # POST /watch_artists.json
  def create
    @watch_artist = WatchArtist.new(watch_artist_params)

    respond_to do |format|
      if @watch_artist.save
        format.html { redirect_to @watch_artist, notice: 'Watch artist was successfully created.' }
        format.json { render :show, status: :created, location: @watch_artist }
      else
        format.html { render :new }
        format.json { render json: @watch_artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /watch_artists/1
  # PATCH/PUT /watch_artists/1.json
  def update
    respond_to do |format|
      if @watch_artist.update(watch_artist_params)
        format.html { redirect_to @watch_artist, notice: 'Watch artist was successfully updated.' }
        format.json { render :show, status: :ok, location: @watch_artist }
      else
        format.html { render :edit }
        format.json { render json: @watch_artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /watch_artists/1
  # DELETE /watch_artists/1.json
  def destroy
    @watch_artist.destroy
    respond_to do |format|
      format.html { redirect_to watch_artists_url, notice: 'Watch artist was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_watch_artist
      @watch_artist = WatchArtist.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def watch_artist_params
      params.require(:watch_artist).permit(:user_id, :artist_id)
    end
end
