import React from 'react';
import { FormErrors } from './FormErrors';

export default function NewBidForm(props) {
  const { price, current_price, createBid, errors } = props;
  return (
    <form className="ui form" onSubmit={createBid}>
      <input type="hidden" name="current_price" id="current_price" value={price} />
      <div className="field">
        <label htmlFor="price">Price</label>
        <FormErrors errors={errors} forField="reserve_price" />
        <input
          type="number"
          name="price"
          id="price"
          placeholder={current_price}
          step="1"
          min={current_price}
        />
      </div>
      <button className="ui primary button" type="submit">
        Submit
      </button>
    </form>
  );
}
