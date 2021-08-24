const BASE_URL = 'http://localhost:3000/api/v1';

export const Auction = {
  index() {
    return fetch(`${BASE_URL}/auctions`).then(response => {
      console.log(response);
      return response.json();
    });
  },
  create(params) {
    return fetch(`${BASE_URL}/auctions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
  show(id) {
    return fetch(`${BASE_URL}/auctions/${id}`).then(res => res.json());
  },
};

export const Bid = {
  create(params) {
    return fetch(`${BASE_URL}/auctions/${params.auction_id}/bids`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

export const Session = {
  create(params) {
    return fetch(`${BASE_URL}/session`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
  destroy() {
    return fetch(`${BASE_URL}/session`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(res => res.json());
  },
};

export const User = {
  current() {
    return fetch(`${BASE_URL}/users/current`, {
      credentials: 'include',
    }).then(res => res.json());
  },
  create(params) {
    return fetch(`${BASE_URL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: params }),
    }).then(res => res.json());
  },
};