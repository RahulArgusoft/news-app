import api from "./axios";

export default {
  async signInUserWithUsername({ email, password }) {
    try {
      const response = await api.post("users/login", {
        username: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  },

  // async 
  
  async logoutUser() {
    try {
      const response = await api.post("users/logout")
      return response.data
    } catch (error) {
      return error.response.data
    }
  },

  async verifyToken() {
    try {
      const response = await api.get('users/verify-user')

      return response.data.success
    } catch (error) {
      return error.response.data.success
    }
  }
};
