class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to app_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :back
    end
  end


end
