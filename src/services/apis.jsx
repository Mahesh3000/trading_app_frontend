// src/services/api.js

import axios from "axios";
import config from "../config";

export const fetchCoins = async (searchTerm) => {
  try {
    // Use axios to make the request
    const response = await axios.get(
      `${config.SEARCH_SCRIPS_URL}?query=${searchTerm}`
    ); // Add searchTerm as a query parameter

    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error in fetchScrips:", error);
    throw error; // Re-throw the error after logging it
  }
};
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(config.LOGIN_URL, {
      email: formData.email,
      password: formData.password,
    });
    return response.data; // Return the user data from the response
  } catch (error) {
    console.error(
      "Error in signupUser:",
      error.response?.data || error.message
    );
    throw error.response?.data || error; // Re-throw the error for UI handling
  }
};

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(config.SIGNUP_URL, {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    });
    return response.data; // Return the user data from the response
  } catch (error) {
    console.error(
      "Error in signupUser:",
      error.response?.data || error.message
    );
    throw error.response?.data || error; // Re-throw the error for UI handling
  }
};

export const getProfile = async (userId) => {
  try {
    console.log("userId", userId);

    // Use axios to make the request
    const response = await axios.get(`${config.GET_PROFILE_URL}`, {
      params: { userId }, // Send id as a query parameter
    });

    return response.data; // Return the profile data from the response
  } catch (error) {
    console.error("Error in getProfile:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const addFunds = async (userId, amount) => {
  try {
    const response = await axios.post(`${config.ADD_FUNDS}`, {
      userId,
      amount,
    });

    return response.data; // Returning the response data
  } catch (error) {
    console.error("Error adding funds:", error.response?.data || error.message);
    throw error;
  }
};

export const addWatchlist = async (userId, symbol, companyName, coinId) => {
  try {
    const response = await axios.post(`${config.ADD_WATCHLIST_URL}`, {
      userId,
      symbol,
      companyName,
      coinId,
    });

    return response.data; // Returning the response data
  } catch (error) {
    console.error("Error adding funds:", error.response?.data || error.message);
    throw error;
  }
};

export const getWatchlist = async (userId) => {
  try {
    const response = await axios.get(`${config.GET_WATCHLIST_URL}/${userId}`);
    return response.data.watchlist; // Return the watchlist from response
  } catch (error) {
    console.error("Error fetching watchlist", error);
    throw error;
  }
};

export const deleteFromWatchlist = async (userId, coinId) => {
  try {
    // Construct the DELETE URL with userId and coinId
    const response = await axios.delete(config.DELETE_WATCHLIST_URL, {
      data: { userId, coinId }, // Using 'data' to pass the body content
    });
    return response; // Return the response from the backend
  } catch (error) {
    console.error("Error deleting from watchlist", error);
    throw error; // Propagate error to handle it further up the call stack
  }
};

export const getCoinData = async (userId) => {
  try {
    const response = await axios.get(`${config.GET_COIN_DATA}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist", error);
    throw error;
  }
};

export const getChartCoinData = async (userId, days) => {
  try {
    const response = await axios.get(
      `${config.GET_COIN_DATA}/${userId}/chart?days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist", error);
    throw error;
  }
};

export const tradeCoin = async (
  coinId,
  userId,
  tradeType,
  quantity,
  priceUsd
) => {
  try {
    const response = await axios.post(`${config.TRADE_URL}`, {
      coinId,
      userId,
      tradeType,
      quantity,
      priceUsd,
    });

    return response.data; // Returning the response data
  } catch (error) {
    console.error("Error trading coin:", error.response?.data || error.message);
    throw error;
  }
};

export const getHoldings = async (userId) => {
  console.log("userId in  controllers", userId);

  try {
    const response = await axios.get(`${config.GET_HOLDINGS}`, {
      params: { userId }, // Properly passing userId as a query parameter
    });
    return response.data.holdings;
  } catch (error) {
    console.error("Error fetching holdings", error);
    throw error;
  }
};
