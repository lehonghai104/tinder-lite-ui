import React from 'react';
import { User } from 'types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > .image-cover': {
      flex: 1,
      '& > img': {
        width: '100%',
      }
    },
    '& > .basic-info': {
      padding: '10px'
    },
    '& > .button-group': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: '15px',
      textAlign: 'center',
      '& .btn-pass': {
        color: 'grey'
      }
    }
  }
});

function Card(props: { profile: User, onLike(): void, onPass(): void }): JSX.Element {
  const { profile, onLike, onPass } = props;
  const age = Math.floor(18 + Math.random()*20);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="image-cover">
        <img src={profile.picture}/>
      </div>
      <div className="basic-info">
        <h1>
          {profile.firstname} {profile.lastname}, {age}
        </h1>
      </div>
      <div className="button-group">
        <Fab color="secondary" aria-label="add" onClick={onLike}>
          <FavoriteIcon />
        </Fab>
        <Fab className="btn-pass" aria-label="add" onClick={onPass}>
          <ClearIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Card;
