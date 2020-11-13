class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update, :destroy]
  before_action :set_admin, only: [:index]

  # ユーザー一覧ページ
  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # ユーザー詳細ページ
  # GET /users/1
  # GET /users/1.json
  def show
    @user = current_user
    @keep = Keep.new
    gon.keeps = []
    keeps = Keep.where(user_id: current_user).includes(:concert)
    keeps.each do |k|
      gon.keeps.push(k.concert.venue)
    end
  end

  # ユーザー削除
  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # Adminに追加
  def add_admin
    @user = User.find(params[:id])
    @user.update_column(:admin, true)
    redirect_to users_path
  end

  # Adminから削除
  def destroy_admin
    @user = User.find(params[:id])
    @user.update_column(:admin, false)
    redirect_to users_path
  end

  def about
    gon.venues = Venue.all
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.fetch(:user, :admin, {})
  end
end
