class StaticPagesController < ApplicationController
  before_filter :redirect_unless_logged_in, except: [:root]

  def root
    @user = User.new
  end

  def app

  end
end
