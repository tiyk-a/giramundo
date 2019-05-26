class ApplicationController < ActionController::Base
  add_flash_types :success, :info, :warning, :danger
  helper_method :admin_user?

  def after_sign_in_path_for(resource)
    concerts_path
  end

  def after_sign_out_path_for(resource)
    concerts_path
  end

  def admin_user?
    user_signed_in? && current_user.admin == true
  end

  def set_admin
    if user_signed_in? && current_user.admin == true
    else
      redirect_to concerts_path
    end
  end
end
