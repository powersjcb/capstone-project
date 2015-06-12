class Api::GroupsController < Api::ApiController
  def index
    @groups = Group.all
    render json: @groups
  end

  def show
    @group = Group.includes(:conversations, :members).find(params[:id])
    # load first conversation
    @conversation = @group.conversations.first
    @conversations = @group.conversations
    render :show
  end

  def group_conv
    @group = Group.includes(:conversations, :members).find(params[:group_id])
    # load first conversation
    @conversation = @group.conversations.find(params[:id])
    @conversations = @group.conversations
    render :show
  end
end
