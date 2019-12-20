class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate, :origin_check

  def authenticate
    authenticate_or_request_with_http_token do |token, options|
      token == Constant::AUTHORIZATIONKEY
    end
  end

  def origin_check
    if request.headers["origin"] != Constant::ORIGIN_URL[Rails.env]
      render "forbidden", status: 403
    end
  end
end
