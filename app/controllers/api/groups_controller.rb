class Api::GroupsController < Api::ApiController
  def index
    @groups = Group.includes(:conversations).all
    render :index
  end

  def show
    @group = Group.includes(:conversations, :members).find(params[:id])
    @conversations = @group.conversations
    render :show
  end

  def create
    @group = current_user.created_groups.new(group_params)

    if @group.save
      render json: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, :description)
  end
end
