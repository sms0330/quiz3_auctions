class Api::V1::BidsController < Api::ApplicationController
    before_action :authenticate_user!

    def create
        auction = Auction.find params[:auction_id]
        auction.user = current_user
        
        bid = Bid.new bid_params
        bid.user = current_user
        bid.auction = auction
        bid.save!
        render json: { id: auction.id }
    end

    private

    def bid_params
        params.require(:bid).permit(:price, :auction_id)
    end
end
