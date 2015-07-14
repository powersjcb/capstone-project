require 'resque_web'

resque_web_constraint = lambda do |request|
  current_user = request.env['warden'].user

end

Rails.application.routes.draw do
  get 'messages/index'

  root to: 'static_pages#root'
  get 'app', to: 'static_pages#app', as: 'app'
  resources :users, only: [:create]
  resource :sessions, only: [:create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:create]
    resources :groups, only: [:show, :index, :create, :destroy]
    resources :conversations, only: [:create, :destroy, :show]
    resources :memberships, only: [:create, :destroy, :show]
    resources :users, only: [:update]
    post '/pusher/auth', to: 'pusher#auth'
    get '/groups/:id/search', to: 'messages#search'
    get '/conversations/:id/page/:page', to: 'conversations#messages'
  end

  constraints resque_web_constraint do
    mount ResqueWeb::Engine => '/resque_web'
  end
end
