class AddPositionToTextBlocks < ActiveRecord::Migration[6.0]
  def change
    add_column :text_blocks, :position, :integer
  end
end
