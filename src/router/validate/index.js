import ApiController from '@/services/ApiService';
import MockService from '@/services/MockService';

class ValidateRoutes {

  // Check if user exists in api (search by id param)
  async validateLogin(to) {
    if(to.name === 'home') {
      const exists = await ApiController.login(to.params.id);
      
      if(!exists.data) return { name: 'login' }
    }
  }

  // Check if exists a selected plan
  async validateSignUp(to) {
    if(to.name === 'signUp') {
      const planId = to.params.id;
      const request = await MockService.getPlans();
      const valideSelectedPlan = request.data.filter(plan =>  plan.id === planId);

      if(!valideSelectedPlan.length > 0) return { name: 'chooseAPlan' }
    }
  }

  // Go to login screen if get not-found page
  validateNotFound(to) {
    if(to.name === 'not-found') return { name: 'login' }
  }

}

export default new ValidateRoutes();