class ListingsController < ApplicationController
  def home
    render 'home.html.erb'
  end

  def index
    @employer = params[:employer]
    render 'index.html.erb'
  end
end
