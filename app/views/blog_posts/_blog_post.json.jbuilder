json.extract! blog_post, :id, :name, :body, :created_at, :updated_at
json.url blog_post_url(blog_post, format: :json)

json.text_blocks blog_post.text_blocks, :id, :body, :created_at, :updated_at