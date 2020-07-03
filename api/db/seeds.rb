# Dir.glob("#{Rails.root}/db/seeds/*.rb").sort.each { |f| require f }
Dir.glob("#{Rails.root}/db/seeds/04*.rb").sort.each { |f| require f }
