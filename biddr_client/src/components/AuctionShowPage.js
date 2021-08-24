import React, { useState, useEffect } from 'react';

import { Bid } from '../requests';
import { BidList } from './BidList';
import { Auction } from '../requests';
import { Spinner } from '../Spinner';

export const AuctionShowPage = props => {
    const [auction, setAuction] = useState(null);
    const [bid, setBid] = useState({});
    useEffect(() => {
        Auction.show(props.match.params.id).then(auction => {
        setAuction(auction);
        });
    }, [props.match.params.id]);
    const createBid = e => {
        e.preventDefault();
        setAuction({
        ...auction,
        bids: [
            {
            ...bid,
            id: Math.max(...auction.bids.map(bid => bid.id)) + 1,
            },
            ...auction.bids,
        ],
        });
    };

  return auction ? (
    <main>
      <h1 className="ui header">{auction.title}</h1>
      <p className="auction-item">Added by {auction.owner.full_name} on {new Date(auction.created_at).toLocaleDateString()}</p>
      
      <h4 className="ui header">Description:</h4>
      <p className="auction-item">{auction.description}</p>

      <h4 className="ui header">Ends At:</h4>
      <p className="auction-item">{new Date(auction.ends_at).toLocaleDateString()}</p>

      <h4 className="ui header">Current Price:</h4>
      <p className="auction-item">${auction.current_price}</p>

      <p className="auction-item">{auction.reserve_price}</p>

      <form 
        className="ui form" 
        onSubmit={createBid}
      >
        <input 
          type="hidden" 
          name="current_price"
          id="current_price"
          value={auction.current_price}
        />
        <div className="field">
            <label htmlFor="price">Price</label>
            <input 
                type="number" 
                name="price" 
                id="price" 
                placeholder={auction.current_price} 
                step="1"
                min={auction.current_price}
            />
          </div>
          <button className="ui orange button" type="submit">
                Bid
          </button>
      </form>

      <BidList bids={auction.bids} />

    </main>
  ) : (
    <Spinner />)
};
