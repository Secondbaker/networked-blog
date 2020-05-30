class AddReferencesToInternalLinks < ActiveRecord::Migration[6.0]
  def change
    add_reference :internal_links, :source
    add_reference :internal_links, :destination
  end
end
