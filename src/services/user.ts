import { User } from 'types';

export const loadUnmeetProfiles = (): Promise<User[]> =>
  fetch('http://localhost:3000/users/unmeet', {
    // headers: {
    //   'app-id': '60ded183711eaf229f360aeb'
    // }
  }).then(response => response.json())
    .then(json => json.data)
    .catch(e => {
      console.log(e);
      return [];
    });
