import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auction } from '../requests';
import { Spinner } from '../Spinner';

export const AuctionIndexPage = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        Auction.index().then(auctions => { 
            setAuctions(auctions);
        });
    }, []);

    return auctions ? (
      <main>
        <h1>Auctions</h1>
        <ul>
          {auctions.map((auction, index) => (
            <li key={index}>
              <Link to={`/auctions/${auction.id}`}>{auction.title}</Link>
              <p>Price: ${auction.reserve_price} </p>
              <p>Created at: {new Date(auction.created_at).toLocaleDateString()}</p>
              <p>Owner: {auction.owner ? auction.owner.full_name : null}</p>
            </li>
          ))}
        </ul>
      </main>
    ) : (
      <Spinner />
    );
  }
