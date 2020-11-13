class WatchArtistsController < ApplicationController
  # watchアーティスト登録
  def add_watch_artist
    watch_artist = WatchArtist.new(artist_id: params[:id], user_id: current_user.id)
    artist_id = params[:id]
    watch_artist.save
    @artist = artist_id
    render :file => "/app/views/watch_artists/watch_artist.js.erb"
  end

  # watchアーティスト削除
  def destroy_watch_artist
    watch_artist = WatchArtist.find_by(artist_id: params[:id], user_id: current_user.id)
    deleted_artist_id = params[:id]
    watch_artist.destroy
    @artist = deleted_artist_id
    render :file => "/app/views/watch_artists/watch_artist.js.erb"
  end

  private
  def watch_artist_params
    params.require(:watch_artist).permit(:artist_id, :user_id)
  end
end
