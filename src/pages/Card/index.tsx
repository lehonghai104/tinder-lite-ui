import React from 'react';
import { Profile } from 'types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100%',
    backgroundColor: 'aqua',
    display: 'flex',
    flexDirection: 'column',
    '& > .image-cover': {
      flex: 1,
      '& > img': {
        width: '100%',
      }
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

function Card(props: { profile: Profile, onLike(): void, onPass(): void }): JSX.Element {
  const { profile, onLike, onPass } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="image-cover">
        <img src={profile.picture}/>
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
