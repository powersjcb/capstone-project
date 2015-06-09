Rails.application.routes.draw do
  root to: 'static_pages#root'
  get "app", to: 'static_pages#app', as: "app"
  resources :users, only: [:create]
end
