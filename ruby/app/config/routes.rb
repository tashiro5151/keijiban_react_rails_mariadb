Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace "api" do
    namespace "v1" do
      get "/search/:str/:num", to: "search#show"

      get "/rooms/:num", to: "rooms#index"
      get "/rooms/:id/:num", to: "rooms#show"
      post "/rooms", to: "rooms#create"

      get "/talks/:id/:num", to: "talks#show"
      post "/talks", to: "talks#create"
    end
  end
end
