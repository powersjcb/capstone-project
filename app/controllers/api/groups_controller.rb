class Api::GroupsController < Api::ApiController
  def index
    @groups = Group.all
    render json: @groups
  end

  def show
    @group = Group.includes(:conversations, :members).find(params[:id])
    # load first conversation
    @conversation = @group.conversations.first
    render :show
  end
end
