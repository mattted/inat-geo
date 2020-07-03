class AddImagesToObservations < ActiveRecord::Migration[6.0]
  def change
    add_column :observations, :img, :text, array: true, default: []
  end
end
