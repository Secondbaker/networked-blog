class CreateBlogPosts < ActiveRecord::Migration[6.0]
  def change
    create_table :blog_posts do |t|
      t.string :name
      t.text :body

      t.timestamps
    end
  end
end
