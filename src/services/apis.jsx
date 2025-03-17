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
