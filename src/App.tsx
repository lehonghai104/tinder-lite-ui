import React, { useState, useEffect } from 'react';
import Card from 'pages/Card';
import { loadUnmeetProfiles } from 'services';
import { Profile } from 'types';
import 'App.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '600px',
    margin: '0 auto',
    '& .div': {
      padding: '5px'
    },
    '& .card-cover': {
      flex: 1,
      backgroundColor: 'bisque'
    }
  }
});

function App(): JSX.Element {
  const [unmeetProfiles, setUnmeetProfiles] = useState<Profile[]>([]);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    console.log('run useEffect');
    loadUnmeetProfiles().then(setUnmeetProfiles);
  }, []);

  const onLike = () => {
    const [p, ...others] = unmeetProfiles;
    setUnmeetProfiles(others);
    setLikedProfiles([...likedProfiles, p]);
  };

  const onPass = () => {
    const [p, ...others] = unmeetProfiles;
    setUnmeetProfiles(others);
    setPassedProfiles([...passedProfiles, p]);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="div">
        Unmeet: {unmeetProfiles.length}
      </div>
      <div className="div">
        Liked: {likedProfiles.length}
      </div>
      <div className="div">
        Passed: {passedProfiles.length}
      </div>
      <div className="card-cover">
        { unmeetProfiles.length == 0 && <h1>Loading profiles...</h1>}
        { unmeetProfiles.length > 0 && <Card profile={unmeetProfiles[0]} onLike={onLike} onPass={onPass} />}
      </div>

    </div>
  );
}

export default App;
