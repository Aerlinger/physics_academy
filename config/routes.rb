PhysicsAcademy::Application.routes.draw do

  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"}

  root to: 'static_pages#home'

  get "labs/circuits"
  get "labs/mechanics"

  match '/labs', to: 'labs#index'
  match '/labs/circuits/:circuit_name', to: 'labs#circuits'


  resources :circuit_simulations
  resources :circuit_elements

  #resources :users
  resources :lessons do

    member { post :vote }

    resources :challenges do
      put :submit, on: :member
      put :reset, on: :member
      put :reset_all, on: :member
      get :error, on: :member
      get :warning, on: :member
      get :next, on: :member
    end

  end

  # Since we have no need to show or edit sessions, we’ve restricted the actions to new, create, and destroy
  #resources :sessions, only: [:new, :create, :destroy]

  #match '/signup',  to: 'users#new'
  #match '/signin',  to: 'sessions#new'
  #match '/signout', to: 'sessions#destroy', via: :delete

  match '/help',    to: 'static_pages#help'

  match '/about',   to: 'static_pages#about'
  match '/privacy', to: 'static_pages#privacy'
  match '/terms',   to: 'static_pages#terms'



  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end

#== Route Map
# Generated on 10 Jul 2012 16:24
#
#                 root        /                               static_pages#home
#                users GET    /users(.:format)                users#index
#                      POST   /users(.:format)                users#create
#             new_user GET    /users/new(.:format)            users#new
#            edit_user GET    /users/:id/edit(.:format)       users#edit
#                 user GET    /users/:id(.:format)            users#show
#                      PUT    /users/:id(.:format)            users#update
#                      DELETE /users/:id(.:format)            users#destroy
#          vote_lesson POST   /lessons_content/:id/vote(.:format)     lessons_content#vote
#              lessons_content GET    /lessons_content(.:format)              lessons_content#index
#                      POST   /lessons_content(.:format)              lessons_content#create
#           new_lesson GET    /lessons_content/new(.:format)          lessons_content#new
#          edit_lesson GET    /lessons_content/:id/edit(.:format)     lessons_content#edit
#               lesson GET    /lessons_content/:id(.:format)          lessons_content#show
#                      PUT    /lessons_content/:id(.:format)          lessons_content#update
#                      DELETE /lessons_content/:id(.:format)          lessons_content#destroy
#             sessions POST   /sessions(.:format)             sessions#create
#          new_session GET    /sessions/new(.:format)         sessions#new
#              session DELETE /sessions/:id(.:format)         sessions#destroy
#               signup        /signup(.:format)               users#new
#               signin        /signin(.:format)               sessions#new
#              signout DELETE /signout(.:format)              sessions#destroy
#                 help        /help(.:format)                 static_pages#help
#                about        /about(.:format)                static_pages#about
#              privacy        /privacy(.:format)              static_pages#privacy
#                terms        /terms(.:format)                static_pages#terms
