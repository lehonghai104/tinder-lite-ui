import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// export interface UserRegistration{
//   email: string;
//   password: string;
//   firstname: string;
//   lastname: string
//   gender: string;
//   picture: string;
// }

// export const register = (user: UserRegistration) => {
//   return axios.post(API_URL + 'signup', user);
// };

export interface UserStorage {
  access_token?: string
}

export const login = (credential: {username: string, password: string}): Promise<UserStorage> => {
  return axios
    .post(`${API_URL}/auth/login`, credential)
    .then((response) => {
      if (response.data.access_token) {
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): UserStorage => {
  const userStr = localStorage.getItem('user');
  return userStr && JSON.parse(userStr);
};

export const getAuthHeader = (): { Authorization?: string } => {
  const user = getCurrentUser();

  if (user && user.access_token) {
    return { Authorization: 'Bearer ' + user.access_token }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
};
