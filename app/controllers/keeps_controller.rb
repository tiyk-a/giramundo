class KeepsController < ApplicationController
  def add_keep
    keep = Keep.new(concert_id: params[:id], user_id: current_user.id)
    concert_id = params[:id]
    keep.save
    @keep = concert_id
    render :file => "/app/views/keeps/keep.js.erb"
  end

  def destroy_keep
    keep = Keep.find_by(user_id: current_user, concert_id: params[:id])
    concert_id = params[:id]
    keep.destroy
    @keep = concert_id
    render :file => "/app/views/keeps/keep.js.erb"
  end

  private

  def keep_params
    params.require(:keep).permit(:user_id, :concert_id)
  end
end
