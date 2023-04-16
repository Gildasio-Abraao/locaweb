import axios from "axios";

class MockService {
  constructor() {
    this.url = '/mock/plans.json';
  }

  getPlans() {
    return axios.get(this.url);
  }
}

export default new MockService();