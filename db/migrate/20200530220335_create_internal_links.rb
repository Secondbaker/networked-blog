class CreateInternalLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :internal_links do |t|

      t.timestamps
    end
  end
end
