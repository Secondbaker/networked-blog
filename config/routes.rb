Rails.application.routes.draw do
  resources :text_blocks
  resources :blog_posts do
    
  end
  post 'blog_posts/:id/text_blocks/new', to: 'blog_posts#new_text_block', as: 'blog_posts_new_text_block'
  root to: 'blog_posts#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
