class Api::MessagesController < ApplicationController
  before_filter :bounce_api_unless_logged_in

  def index
    @messages = Message.all
    render json: @messages
  end

  def show

  end

  def create

  end

end
