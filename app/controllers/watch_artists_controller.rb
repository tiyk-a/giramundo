class WatchArtistsController < ApplicationController
  def add_watch_artist
    watch_artist = WatchArtist.new(artist_id: watch_artist_params[:artist_id], user_id: current_user.id)
    watch_artist.save
    respond_to do |format|
      format.html { redirect_to artists_url}
      format.json { head :no_content }
    end
  end

  def destroy_watch_artist
    watch_artist = WatchArtist.find_by(artist_id: params[:id], user_id: current_user.id)
    watch_artist.destroy
    redirect_to artists_path
  end

  private
  def watch_artist_params
    params.require(:watch_artist).permit(:artist_id, :user_id)
  end
end
