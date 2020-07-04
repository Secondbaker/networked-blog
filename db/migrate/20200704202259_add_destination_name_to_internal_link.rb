class AddDestinationNameToInternalLink < ActiveRecord::Migration[6.0]
  def change
    add_column :internal_links, :destination_name, :string
  end
end
