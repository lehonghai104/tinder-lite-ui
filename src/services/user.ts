import { Profile } from 'types';

export const loadUnmeetProfiles = (): Promise<Profile[]> =>
  fetch('https://dummyapi.io/data/api/user?limit=10', {
    headers: {
      'app-id': '60ded183711eaf229f360aeb'
    }
  }).then(response => response.json())
    .then(json => json.data)
    .catch(e => {
      console.log(e);
      return [];
    });
