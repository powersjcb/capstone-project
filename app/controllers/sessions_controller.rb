class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    if @user
      login(@user)
      redirect_to "/app"
    else
      flash[:errors] = ["Invalid credentials"]
      redirect_to :back
    end
  end

  def destroy
    logout(current_user)
    redirect_to root_url
  end

end
