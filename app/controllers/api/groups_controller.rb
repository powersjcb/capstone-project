class Api::GroupsController < Api::ApiController
  def index
    @groups = Group.all
    render json: @groups
  end

  def show
    @group = Group.includes(:conversations).find(params[:id])
    render json @group
  end
end
