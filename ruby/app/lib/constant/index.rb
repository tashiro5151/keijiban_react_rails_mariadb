require "yaml"

module Constant
  AUTHORIZATIONKEY = "abc"
  ORIGIN_URL = {
    "development" => "http://192.168.0.4:1234",
    "production" => "http://" + ENV["SERVER_IP"] + ":" + ENV["NGINX_PORT"],
  }
  SQL = YAML.load_file("#{Rails.root}/lib/sql.yml")
end
