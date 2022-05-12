import axios from "axios";

const UNM = 'UNM';
const UID = 'UID';

class AuthService {
  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username: string, password: string, uid: string) {
    sessionStorage.setItem(UNM, username);
    sessionStorage.setItem(UID, uid);
    const tkn = this.createBasicAuthToken(username, password);
    sessionStorage.setItem('TKN', tkn);
    this.setupAxiosInterceptors(tkn);
  }

  logout() {
    sessionStorage.removeItem(UNM);
    sessionStorage.removeItem(UID);
    sessionStorage.removeItem('TKN');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(UNM);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(UNM);
    if (user === null) return '';
    return user;
  }

  setupAxiosInterceptors(token: string) {
    axios.defaults.headers.common['Authorization'] = token;
  }


}
export default new AuthService();
