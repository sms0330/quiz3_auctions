import React, { useState, useEffect } from 'react';

import { Bid } from '../requests';
import { BidList } from './BidList';
import { Auction } from '../requests';
import NewBidForm from './NewBidForm';
import { Spinner } from '../Spinner';

export const AuctionShowPage = props => {
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState({});
  const [errors, setErrors] = useState([]);
  

  useEffect(() => {
    Auction.show(props.match.params.id).then(auction => {
      setAuction(auction);
    });
  }, [props.match.params.id]);

  const createBid = event => {
    event.preventDefault();
    const { currentTarget } = event;
    const fd = new FormData(currentTarget);

    const newBid = {
      price: fd.get('price'),
      current_price: fd.get('current_price'),
      auction_id: auction.id,
    };

    Bid.create(newBid).then(data => {
      if (!data.errors) {
        props.history.push(`/auctions/${data.auction_id}`);
      } else {
        setErrors(data.errors);
        console.log(errors)
      }
    });
    currentTarget.reset();
    window.location.reload();
  };

  const currentPrice = auction => {
    let currentPrice = 0;
    auction.bids.forEach(bid => {
      if (bid.price > currentPrice) {
        currentPrice = bid.price;
      };
    });
    return currentPrice;
  };

  return auction ? (
    <main>
      <h1 className="ui header">{auction.title}</h1>
      <p className="field">
        Added by {auction.owner.full_name} on {new Date(auction.created_at).toLocaleDateString()}
      </p>

      <h4 className="ui header">Description:</h4>
      <p className="field">{auction.description}</p>

      <h4 className="ui header">Ends At:</h4>
      <p className="field">{new Date(auction.ends_at).toLocaleDateString()}</p>

      <h4 className="ui header">Current Price:</h4>
      <p className="field">${currentPrice(auction)}</p>

      {/* <p className="field">{auction.reserve_price}</p> */}

      <NewBidForm current_price={bid.price} onChange={setBid} createBid={createBid} />
      <BidList bids={auction.bids} />
    </main>
  ) : (
    <Spinner />
  );
};
