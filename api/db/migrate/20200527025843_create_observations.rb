class CreateObservations < ActiveRecord::Migration[6.0]
  def change
    create_table :observations do |t|
      t.datetime :date
      t.decimal :lat
      t.decimal :lon
      t.string :url
      t.string :usr
      t.bigint :gid
      t.integer :tid
      t.st_point :geom, srid: 4269
      t.references :organism, foreign_key: true
      t.references :county, foreign_key: true
    end

    add_index :observations, :geom, using: :gist
    add_index :observations, :date
    add_index :observations, :gid
  end
end
