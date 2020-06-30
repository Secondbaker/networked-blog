Rails.application.routes.draw do
  resources :blog_posts do
  end
  root to: 'blog_posts#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
