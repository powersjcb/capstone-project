class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    if @user
      login(@user)
      redirect_to app_url
      ## * eventually make it so this auto creates a new account if username
      ##   isn't taken
    else
      flash.now[:errors] = ["Invalid credentials"]
      render :new
    end
  end

  def destroy
    logout(current_user)
    redirect_to root_url
  end

end
