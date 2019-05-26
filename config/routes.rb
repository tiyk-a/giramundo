Rails.application.routes.draw do
  resources :performers
  resources :keeps
  resources :concerts
  root 'artists#index'
  resources :artists
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
