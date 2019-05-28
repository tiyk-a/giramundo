Rails.application.routes.draw do
  root 'concerts#index'

  # USERS
  devise_for :users
  resources :users, only: [:index, :show, :destroy]
  post '/add_admin/:id', to: 'users#add_admin', as: :add_admin
  post '/destroy_admin/:id', to: 'users#destroy_admin', as: :destroy_admin

  # ARTISTS
  resources :artists, only: [:index, :show, :destroy, :create, :update] do
    get :autocomplete_artist_artist_name, :on => :collection
  end
  post '/artist_id_refresh', to: 'artists#id_refresh', as: :artist_id_refresh

  # CONCERTS
  resources :concerts, only: [:index, :show, :destroy, :create, :update]
  patch '/concert/update_concert/:id', to: 'concerts#update_concert', as: :update_concert
  post '/concerts_sort/:id', to: 'concerts#sort', as: :concerts_sort
  post '/concerts_simple_sort/:id', to: 'concerts#simple_sort', as: :concerts_simple_sort
  get '/switch/:id', to: 'concerts#switch', as: :switch_concert
  get '/admin', to: 'concerts#admin', as: :admin
  get '/date_check', to: 'concerts#date_check', as: :date_check

  # KEEPS
  post '/add_keep/:id', to: 'keeps#add_keep', as: :add_keep
  delete '/destroy_keep/:id', to: 'keeps#destroy_keep', as: :destroy_keep

  # READING LIST
  resources :reading_lists, only: [:create, :update, :destroy]

  # VENUES
  resources :venues, only: [:index, :show, :create, :destroy]
  patch '/venues/', to: 'venues#refresh', as: :refresh_venue
  post '/venues_sort/:id', to: 'venues#sort', as: :venues_sort

  # WATCH ARTISTS
  post '/add_watch_artist/:id', to: 'watch_artists#add_watch_artist', as: :add_watch_artist
  delete '/destroy_watch_artist/:id', to: 'watch_artists#destroy_watch_artist', as: :destroy_watch_artist

  # FEEDS & ENTRIES
  resources :feeds, only: [:index, :destroy, :create, :update] do
    member do
    resources :entries, only: [:index]
    end
  end
  delete '/entry/:id', to: 'feeds#destroy_entry', as: :destroy_entry
  get '/entries_all', to: 'entries#all', as: :all_entries
  get '/top_entries', to: 'entries#top', as: :top_entries
  get '/about', to: 'users#about', as: :about
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
