class AddImagesToOrganisms < ActiveRecord::Migration[6.0]
  def change
    add_column :organisms, :img, :text, array: true, default: []
  end
end
