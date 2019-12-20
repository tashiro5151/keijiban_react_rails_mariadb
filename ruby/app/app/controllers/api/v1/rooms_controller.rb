module Api
  module V1
    class RoomsController < ApplicationController
      def index
        page_size = 10

        o = ActiveRecord::Base.send(
          :sanitize_sql_array,
          [
            Constant::SQL[0],
            {
              limit: page_size,
              offset: page_size * params["num"].to_i,
            },
          ]
        )

        list = ActiveRecord::Base.connection.select_all(o)

        render json: { list: list, count: Room.count }
      end

      def show
        page_size = 10

        o = ActiveRecord::Base.send(
          :sanitize_sql_array,
          [
            Constant::SQL[1],
            {
              genreId: params["id"],
              limit: page_size,
              offset: page_size * params["num"].to_i,
            },
          ]
        )

        list = ActiveRecord::Base.connection.select_all(o)

        render json: { list: list, count: Room.where({ genreId: params["id"] }).count }
      end

      def create
        ret = Room.create(name: params["name"], genreId: params["genreId"])
        render json: { id: ret["id"] }
      end
    end
  end
end
