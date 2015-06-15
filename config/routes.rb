Rails.application.routes.draw do
  get 'messages/index'

  root to: 'static_pages#root'
  get "app", to: 'static_pages#app', as: "app"
  resources :users, only: [:create]
  resource :sessions, only: [:create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :messages
    resources :groups
    resources :conversations
    resources :memberships
    post '/pusher/auth', to: 'pusher#auth'
    get '/groups/:id/search', to: "messages#search"
  end

end
