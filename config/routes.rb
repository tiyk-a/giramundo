Rails.application.routes.draw do
  resources :entries
  resources :feeds
  devise_for :users
  resources :watch_artists
  resources :venues
  resources :performers
  resources :keeps
  resources :concerts
  root 'concerts#index'
  resources :artists

  get '/about', to: 'users#about', as: :about
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
