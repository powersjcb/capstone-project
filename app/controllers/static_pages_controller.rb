class StaticPagesController < ApplicationController
  def root
    @user = User.new
  end
end
