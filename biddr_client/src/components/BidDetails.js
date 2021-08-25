import React from 'react';

function BidDetails(props) {
    return (
        <div className="ui segment BidDetails">
            <div className="ui header">Bid Details</div>
            <p>
                {props.price} <br />
            </p>
            <p>
                <small>Price: {props.price}</small>
                <small>Bider: {props.full_name}</small>
                <small>Create Date: {props.created_at}</small>
            </p>
        </div>
    );
}

export default BidDetails;