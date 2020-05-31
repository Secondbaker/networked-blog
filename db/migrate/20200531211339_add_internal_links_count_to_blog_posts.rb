class AddInternalLinksCountToBlogPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :blog_posts, :internal_links_count, :integer, default: 0
  end
end
