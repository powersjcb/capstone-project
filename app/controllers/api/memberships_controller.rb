class Api::MembershipsController < Api::ApiController

  def create
    @membership = current_user.memberships.find_or_create_by(membership_params)
    if @membership.save
      render json: @membership
    else
      render json: @membership.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.memberships.find(params[:id]).destroy
      render json: {}
    else
      render json: {}, status: 404
    end
  end

  ## memberships for current_user
  # def index
  #
  # end

  private
  def membership_params
    params.require(:membership).permit(:group_id)
  end
end
