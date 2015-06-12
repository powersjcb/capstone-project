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

    get '/api/groups/:group_id/conversations/:id', to: 'api_groups#group_conv'
  end

end
