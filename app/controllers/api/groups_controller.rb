class Api::GroupsController < Api::ApiController
  def index
    @groups = Group.includes(:conversations).all
    render :index
  end

  def show
    @group = Group.includes(:conversations, :members).find(params[:id])
    if @group.has_member?(current_user)
      @conversations = @group.conversations
      render :show
    else
      render json: {errors: "You must be a member to view this group"}, status: 403
    end
  end

  def create
    @group = current_user.created_groups.new(group_params)

    if @group.save
      render :create
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, :description)
  end
end
