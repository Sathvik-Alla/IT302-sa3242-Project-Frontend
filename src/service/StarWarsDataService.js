/**
 * Name: Sathvik Alla
 * Date: October 30, 2026
 * Course: IT-302-001
 * Assignment: Phase 4 Read Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_BACKEND_URL}/api/v1/sa3242/starwars`;

class StarWarsDataService {

  // Retrieve Star Wars records
  getAll(pageNumber = 0) {
    return axios.get(API_URL, {
      params: {
        pageNumber,
        itemsPerPage: 20
      }
    });
  }

  // Search Star Wars records by name
  findByName(name, pageNumber = 0) {
    return axios.get(API_URL, {
      params: {
        name,
        pageNumber,
        itemsPerPage: 20
      }
    });
  }

  // Retrieve one Star Wars record by MongoDB ID
  get(id) {
    return axios.get(`${API_URL}/id/${id}`);
  }
}

const starWarsDataService = new StarWarsDataService();

export default starWarsDataService;