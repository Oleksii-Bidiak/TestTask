import axios from "axios";

export default class UsersService {
   static async getUsers(page = 100, limit = 6) {
      const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${limit}`);
      return response
   }
   static async getPositions() {
      const positions = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`);
      return positions
   }
   static async getToken() {
      const token = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/token`);
      return token.data.token
   }
}