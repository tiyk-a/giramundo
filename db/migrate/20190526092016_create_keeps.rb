class CreateKeeps < ActiveRecord::Migration[5.2]
  def change
    create_table :keeps do |t|
      t.integer :concert_id
      t.integer :user_id

      t.timestamps
    end
  end
end
