FactoryBot.define do
  factory :concert do
    sequence(:concert_name) {"MANUEL TURIZO ADN"}
    sequence(:source) { "notigiramundo.info" }
    sequence(:image) { nil }
    sequence(:tm_id) {" manuelturizo"}
    sequence(:date) {"Fri, 05 Jul 2019 23:00:00 UTC +00:00"}
    sequence(:timezone) { nil }
    sequence(:local_date) { nil }
    sequence(:venue_id) { 1 }
    sequence(:origin) { 1 }
    sequence(:deleted_at) { nil }
  end
end
