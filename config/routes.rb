Rails.application.routes.draw do
  get 'messages/index'

  root to: 'static_pages#root'
  get "app", to: 'static_pages#app', as: "app"
  resources :users, only: [:create]

  namespace :api do
    resources :messages
  end

end
