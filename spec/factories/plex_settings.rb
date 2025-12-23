FactoryBot.define do
  factory :plex_setting do
    host { "192.168.1.100" }
    port { 32400 }
    auth_token { Faker::Alphanumeric.alpha(number: 20) }
  end
end
