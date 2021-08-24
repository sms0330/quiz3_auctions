import React from "react";

export const BidList = props => {

  return (
    <div>
      <h2 className = "ui horizontal divider header">Bids</h2>
      {props.bids.map(bid => (
          <p className="bid price" key={bid.id}>
            <strong>${bid.price}.00</strong> on {new Date(bid.created_at).toLocaleDateString()}
          </p>
      ))}
    </div>
  );
};
