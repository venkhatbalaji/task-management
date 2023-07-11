import { getUisvcBaseURL } from "../config/config";
import { getRequest, postRequest } from "../utils/request";

export class User {
  static async register(username, password, email, name) {
    const response = await postRequest(`${getUisvcBaseURL()}/register`, {
      username: username,
      password: password,
      email: email,
      name: name,
    });
    return response;
  }
  static async login(password, email) {
    const response = await postRequest(`${getUisvcBaseURL()}/login`, {
      password: password,
      email: email,
    });
    return response;
  }
  static async getUsers(token) {
    const response = await getRequest(
      `${getUisvcBaseURL()}/users`,
      { Authorization: token }
    );
    return response;
  }
}
