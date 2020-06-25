class CreateOrganisms < ActiveRecord::Migration[6.0]
  def change
    create_table :organisms do |t|
      t.string :species
      t.string :kingdom
      t.string :phylum
      t.string :klass
      t.string :order
      t.string :family
      t.string :genus
      t.string :common
      t.integer :tid
    end

    add_index :organisms, :species
    add_index :organisms, :kingdom
    add_index :organisms, :phylum
    add_index :organisms, :klass
    add_index :organisms, :order
    add_index :organisms, :family
    add_index :organisms, :genus
    add_index :organisms, :common
    add_index :organisms, :tid
  end
end
