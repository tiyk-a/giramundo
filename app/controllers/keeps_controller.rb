class KeepsController < ApplicationController
  def create
    @keep = Keep.new(keep_params)
    @keep.save

    respond_to do |format|
      format.html { redirect_to concerts_url, notice: 'Concert was successfully saved.' }
      format.json { head :no_content }
    end
  end

  def destroy
    @keep = Keep.find_by(user_id: params[:user_id], concert_id: params[:concert_id])
    @keep.destroy
    respond_to do |format|
      format.html { redirect_to concerts_url, notice: 'A keep was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

  def keep_params
    params.require(:keep).permit(:user_id, :concert_id)
  end
end
