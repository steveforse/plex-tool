class CreatePlexSettings < ActiveRecord::Migration[8.1]
  def change
    create_table :plex_settings do |t|
      t.string :host, null: false
      t.integer :port, null: false, default: 32400
      t.string :auth_token, null: false

      t.timestamps
    end
  end
end
