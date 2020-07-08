class AddReferenceToTextBlock < ActiveRecord::Migration[6.0]
  def change
    add_reference :text_blocks, :blog_post, null: false, foreign_key: true
  end
end
