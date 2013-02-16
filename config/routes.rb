PhysicsAcademy::Application.routes.draw do

  get "mailing_list/submit"
  get "mailing_list/remove"

  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"},
             controllers: { registrations: "users"  }

  devise_scope :user do
    match "/users/:id", to: "users#show"
  end

  resources :users, only: [:show, :index]

  root to: 'static_pages#home'

  %w[help about privacy terms].each do |page|
    get page, controller: "static_pages", action: page
  end

  post '/mailing_list/submit' => 'mailing_list#submit'

  match '/labs', to: 'labs#index'
  match '/labs/circuits/:circuit_name', to: 'labs#circuits'

  get "labs/circuits"
  get "labs/mechanics"

  resources :simulations, only: [:show, :index]
  resources :mailinglists, only: [:create]

  resources :circuit_simulations
  resources :circuit_elements

  resources :lessons do

    member { post :vote }

    resources :tasks do
      get :submit, on: :member
      put :pass, on: :member
      put :reset, on: :member
      put :reset_all, on: :member
    end

  end

  # Example for admin dashboard (From Owning Rails)
  #scope "admin", :as => "admin" do
  #  get "dashboard" => "admin#show"
  #end

  # Since we have no need to show or edit sessions, we’ve restricted the actions to new, create, and destroy
  #resources :sessions, only: [:new, :create, :destroy]

  #match '/signup',  to: 'users#new'
  #match '/signin',  to: 'sessions#new'
  #match '/signout', to: 'sessions#destroy', via: :delete

  #match '/users/:id',  to: 'users#show'

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

