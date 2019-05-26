class FeedsController < ApplicationController
  before_action :set_feed, only: [:show, :edit, :update, :destroy]
  before_action :set_admin, only: [:index]

  # GET /feeds
  # GET /feeds.json
  def index
    @feeds = Feed.all
    @feed = Feed.new
  end

  # POST /feeds
  # POST /feeds.json
  def create
    @feed = Feed.find_or_initialize_by(url: feed_params[:url])
    if @feed.new_record?
      f = Feed.new(feed_params)
      f.save
      flash[:notice] = "New Feed was created!"
    else
      @feed.update(feed_params)
      flash[:notice] = "Feed was updated!"
    end
    redirect_to feeds_path
  end

  # DELETE /feeds/1
  # DELETE /feeds/1.json
  def destroy
    @feed.destroy
    respond_to do |format|
      format.html { redirect_to feeds_url, notice: 'Feed was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def destroy_entry
    @entry = Entry.find(params[:id])
    @entry.destroy
    redirect_to all_entries_path
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_feed
    @feed = Feed.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def feed_params
    params.require(:feed).permit(:name, :url, :description)
  end
end
