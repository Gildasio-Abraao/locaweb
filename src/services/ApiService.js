import axios from 'axios';

class ApiService {
  constructor() {
    this.url = 'https://fakestoreapi.com/users';
  }

  // Sign up method
  store(data) {
    return axios.post(this.url, data);
  }

  // Login Method (get a random user)
  login(data) {
    const userId = data ? data : '';
    return axios.get(`${this.url}/${userId}`);
  }

}

export default new ApiService();