class PlexSetting < ApplicationRecord
  validates :host, presence: true
  validates :port, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :auth_token, presence: true

  # Singleton pattern - only one settings record should exist
  def self.instance
    first_or_create!
  end
end
