class CreateKeeps < ActiveRecord::Migration[5.2]
  def change
    create_table :keeps, :options => 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
      t.integer :concert_id
      t.integer :user_id

      t.timestamps
    end
  end
end
