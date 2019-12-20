module Api
  module V1
    class SearchController < ApplicationController
      def show
        page_size = 10

        o = ActiveRecord::Base.send(
          :sanitize_sql_array,
          [
            Constant::SQL[2],
            {
              limit: page_size,
              offset: page_size * params["num"].to_i,
              name: "%#{params["str"]}%",
            },
          ]
        )

        list = ActiveRecord::Base.connection.select_all(o)

        render json: { list: list, count: Room.where("name LIKE ?", "%#{params["str"]}%").count }
      end
    end
  end
end
