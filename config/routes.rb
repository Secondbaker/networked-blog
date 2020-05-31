Rails.application.routes.draw do
  resources :blog_posts do
    
  end
  get 'graph', to: 'blog_posts#graph', as: :graph
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
