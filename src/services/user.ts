import { User } from 'types';
import axios from 'axios';
import { getAuthHeader, API_URL } from './auth';

export const loadUnmeetProfiles = (): Promise<User[]> =>
  fetch(`${API_URL}/users/unmeet`, {
    headers: getAuthHeader()
  }).then(response => response.json())
    // .then(json => json.data)
    .catch(e => {
      console.log(e);
      return [];
    });

export const getUserProfile = async (): Promise<User> => {
  return axios.get(`${API_URL}/profile`, { headers: getAuthHeader() });
};

export const like = async (id: string): Promise<void> => {
  return axios.post(`${API_URL}/users/like/${id}`, {}, {
    headers: getAuthHeader(),
  });
};

export const pass = async (id: string): Promise<void> => {
  return axios.post(`${API_URL}/users/pass/${id}`, {}, {
    headers: getAuthHeader()
  });
};

export const unmeetAll = async (): Promise<void> => {
  return axios.delete(`${API_URL}/users/meet`, {
    headers: getAuthHeader()
  });
};
