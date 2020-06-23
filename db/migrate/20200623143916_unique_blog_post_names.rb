class UniqueBlogPostNames < ActiveRecord::Migration[6.0]
  def up
    add_index :blog_posts, :name, unique: true
  end
  def down
    change_column :blog_posts, :name, :string, unique: false
  end
end
