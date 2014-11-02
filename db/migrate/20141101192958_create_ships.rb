class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.string :name
      t.string :flag
      t.integer :imonumber
      t.integer :mmsinumber
      t.string :publicurl
      t.string :type
      t.string :destination
      t.string :etatime
      t.string :heading
      t.string :latitude
      t.string :longitude
      t.string :location
      t.string :navigationstatus
      t.string :photos
      t.string :last_ports
      t.string :positionreceived
      t.timestamps
    end
  end
end
