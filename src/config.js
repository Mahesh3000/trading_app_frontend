// src/config.js

const config = {
  SEARCH_SCRIPS_URL: "http://localhost:8000/api/search",
  LOGIN_URL: "http://localhost:8000/api/users/login",
  SIGNUP_URL: "http://localhost:8000/api/users/signup",
  GET_PROFILE_URL: "http://localhost:8000/api/users/profile",
  ADD_FUNDS: "http://localhost:8000/api/users/add-funds",
  ADD_WATCHLIST_URL: "http://localhost:8000/api/watchlist/add-to-watchlist",
  GET_WATCHLIST_URL: "http://localhost:8000/api/watchlist",
  DELETE_WATCHLIST_URL: "http://localhost:8000/api/watchlist/remove",
  GET_COIN_DATA: "http://localhost:8000/api/coin",
  TRADE_URL: "http://localhost:8000/api/trade",
  GET_HOLDINGS: "http://localhost:8000/api/holdings",
};

export default config;
