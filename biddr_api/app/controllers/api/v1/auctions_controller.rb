class Api::V1::AuctionsController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_auction, only: [:show]

    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def create
        auction = Auction.new auction_params
        auction.user = current_user
        auction.save!
        render json: { id: auction.id }
    end

    def index
        auctions = Auction.order(created_at: :desc)
        render json: auctions
    end

    def show
        render json: @auction, include: [ :owner, {bids: [ :bidder ]} ]
    end

    private

    def auction_params
        params.require(:auction).permit(:title, :description, :ends_at, :reserve_price)
    end

    def find_auction
        @auction = Auction.find(params[:id])
    end

    def record_invalid(error)
        invalid_record = error.record
        errors = invalid_record.errors.map do |field, message|
            {
                type: error.class.to_s, 
                record_type: invalid_record.class.to_s,
                field: field,
                message: message
            }
        end
        render(
            json: {status: 422, errors: errors },
            status: 422 
        )
    end
end
