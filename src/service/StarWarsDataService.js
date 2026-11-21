
/**
 * Name: Sathvik Alla
 * Date: November 20, 2026
 * Course: IT-302-001 Advanced Internet Applications
 * Assignment: Phase 5 C.U.D. Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_BACKEND_URL}/api/v1/sa3242/starwars`;

class StarWarsDataService {

  // GET: Retrieve Star Wars records
  getAll(pageNumber = 0) {
    return axios.get(API_URL, {
      params: {
        pageNumber,
        itemsPerPage: 20
      }
    });
  }

  // GET: Search Star Wars records by name
  findByName(name, pageNumber = 0) {
    return axios.get(API_URL, {
      params: {
        name,
        pageNumber,
        itemsPerPage: 20
      }
    });
  }

  // GET: Retrieve one Star Wars record
  get(id) {
    return axios.get(`${API_URL}/id/${id}`);
  }


  // GET: Retrieve feedback for one Star Wars record
  getFeedback(starWarsId) {
    return axios.get(`${API_URL}/comments/${starWarsId}`);
  }


  // POST: Create feedback for a Star Wars record
  createFeedback(starWarsId, userName, userId, text) {
    return axios.post(`${API_URL}/comments`, {
      starWarsId,
      userName,
      userId,
      text
    });
  }

  // PUT: Update existing feedback
  updateFeedback(commentId, userId, text) {
    return axios.put(`${API_URL}/comments`, {
      commentId,
      userId,
      text
    });
  }

  // DELETE: Delete existing feedback
  deleteFeedback(commentId, userId) {
    return axios.delete(`${API_URL}/comments`, {
      data: {
        commentId,
        userId
      }
    });
  }
}

const starWarsDataService = new StarWarsDataService();

export default starWarsDataService;
