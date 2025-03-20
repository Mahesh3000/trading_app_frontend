// src/services/api.js

import axios from "axios";
import config from "../config";

export const fetchScrips = async (searchTerm) => {
  try {
    // Use axios to make the request
    const response = await axios.get(`${config.SEARCH_SCRIPS_URL}`); // Add searchTerm as a query parameter
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error in fetchScrips:", error);
    throw error; // Re-throw the error after logging it
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
