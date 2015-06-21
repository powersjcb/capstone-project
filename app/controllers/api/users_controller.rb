class Api::UsersController < Api::ApiController

  def update
    @user = current_user
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors, status: 422
    end
  end

  def user_params
    params.require(:user).permit(:profile_img_url)
  end


end
