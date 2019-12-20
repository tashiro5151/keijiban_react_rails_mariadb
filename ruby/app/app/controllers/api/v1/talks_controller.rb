module Api
  module V1
    require "date"

    class TalksController < ApplicationController
      def show
        page_size = 100

        render json: { list: Talk.where({ room_id: params["id"] }).order(:created_at).limit(page_size).offset(page_size * params["num"].to_i).select("name", "message", "created_at", "updated_at"), count: Talk.where({ room_id: params["id"] }).count }
      end

      def create
        ret = Talk.create(room_id: params["room_id"], name: params["name"], message: params["message"], ip: request.env["HTTP_X_FORWARDED_FOR"] || request.remote_ip)

        if ret["id"] != nil
          # update
          data = Room.where({ id: params["room_id"] })
          data.update(updated_at: Time.now)

          render json: { ret: "" }
        else
          render "error", status: 500
        end
      end
    end
  end
end
