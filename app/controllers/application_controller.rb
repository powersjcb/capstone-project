class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout(user)
    user.reset_session_token!
    session[:session_token] = nil
  end

  def redirect_unless_logged_in
    redirect_to root_url unless logged_in?
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :profile_img_url)
  end
end
