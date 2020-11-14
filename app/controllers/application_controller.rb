class ApplicationController < ActionController::Base
  add_flash_types :success, :info, :warning, :danger
  helper_method :admin_user?
  before_action :gg_key

  # ログインしている場合の変遷先
  def after_sign_in_path_for(resource)
    artists_path
  end

  # サインアウトした場合の変遷先
  def after_sign_out_path_for(resource)
    concerts_path
  end

  # adminユーザーの場合
  def admin_user?
    user_signed_in? && current_user.admin == true
  end

  # 
  def set_admin
    if user_signed_in? && current_user.admin == true
    else
      redirect_to concerts_path
    end
  end

  # google mapのキーを環境変数から設定
  def gg_key
    gon.gg_key = GMap
  end
end
