class ArtistsController < ApplicationController
  before_action :set_artist, only: [:show, :edit, :update, :destroy]
  before_action :set_admin, only: [:edit]
  before_action :authenticate_user!, only: [:index]
  autocomplete :artist, :artist_name, full: true
  # GEM https://github.com/peterwillcn/rails4-autocomplete
  # FRIENDLY REFERENCE: https://techblog.kyamanak.com/entry/2018/06/03/170603

  # アーティスト一覧ページ
  # GET /artists
  # GET /artists.json
  def index
    require 'httpclient'
    require 'json'

    # パラメータがある場合、検索する
    unless request.query_string.blank?
      q = request.query_string
      artist = q.split("=")[1]
      a = artist.to_s.split("&")[0]
      @query = artist.to_s.split("&")[0]
      uri = MB_URL + a + "&limit=10&fmt=json"

      client = HTTPClient.new
      request =  client.get(uri)
      result = JSON.parse(request.body.force_encoding('UTF-8'))
      words = {}
      result['artists'].each do |r|
        key = r['id']
        value = r['name']
        words[key] = value
      end
      @foundArtists = words
    end

    if (params.has_key?(:artist))
      searched_name = artist_params[:artist_name]
      found = Artist.all.select{|n| n.artist_name.downcase == searched_name.downcase}
      if found[0] != nil
        @artists = found
      else
        @artists = Artist.all.reverse_order
      end
    else
      @artists = Artist.all.reverse_order
    end
    @artist = Artist.new
    gon.mb_url = MB_URL
    if (Artist.with_deleted.present?)
      gon.next_artist_id = Artist.with_deleted.last.id + 1
    else
      gon.next_artist_id = 0
    end
  end

  # アーティスト詳細ページ
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
    gon.tm_url = TM_URL
    gon.sk_url = SK_URL
    gon.tz_url = TZ_URL
    gon.yt_url = YT_URL
  end

  # アーティスト登録
  # POST /artists
  # POST /artists.json
  def create
    @artist = Artist.find_or_create_by(artist_name: artist_params[:artist_name])
    @artist.update(artist_params)
    gon.artist = @artist
  end

  # アーティスト情報更新
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

  # アーティスト削除
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
