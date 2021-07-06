import React, { useState } from 'react';
import Card from 'pages/Card';
import { getUserProfile, loadUnmeetProfiles, like, pass, login, unmeetAll } from 'services';
import { User } from 'types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { blue, pink } from '@material-ui/core/colors';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

interface SnackbarInfo {
  open: boolean;
  type: 'success' | 'error';
  message: string;
}

function App(): JSX.Element {
  const [unmeetProfiles, setUnmeetProfiles] = useState<User[]>([]);
  // const [likedProfiles, setLikedProfiles] = useState<User[]>([]);
  // const [passedProfiles, setPassedProfiles] = useState<User[]>([]);
  const [snackbar, setSnackBar] = useState<SnackbarInfo>({ open: false, type: 'success', message: '' });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginSampleAccount = async (type: 'M' | 'F'): Promise<void> => {
    setIsLoggedIn(false);
    const credentials = {
      F: { username: 'sara.andersen@example.com', password: '123456' },
      M: { username: 'rudi.droste@example.com', password: '123456' },
    };
    await login(credentials[type]);
    await getUserProfile();
    setUnmeetProfiles(await loadUnmeetProfiles());
    setIsLoggedIn(true);
  };

  const onLike = async () => {
    const [p, ...others] = unmeetProfiles;
    await like(p.id)
      .then(() => {
        setSnackBar({ open: true, type: 'success', message: 'Liked' });
      })
      .catch(() => {
        setSnackBar({ open: true, type: 'error', message: 'Failed' });
      });

    setUnmeetProfiles(others);
    // setLikedProfiles([...likedProfiles, p]);
  };

  const onPass = async () => {
    const [p, ...others] = unmeetProfiles;
    await pass(p.id)
      .then(() => {
        setSnackBar({ open: true, type: 'success', message: 'Passed' });
      })
      .catch(() => {
        setSnackBar({ open: true, type: 'error', message: 'Failed' });
      });

    setUnmeetProfiles(others);
    // setPassedProfiles([...passedProfiles, p]);
  };

  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: pink,
    },
  });

  return (
    <div className={classes.root}>
      <div>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" onClick={() => loginSampleAccount('M')}>
            Login as Male
          </Button>
          <Button variant="contained" color="secondary" onClick={() => loginSampleAccount('F')}>
            Login as Female
          </Button>
          <Button variant="contained" onClick={() => unmeetAll()}>
            Reset Profile
          </Button>
        </ThemeProvider>
      </div>

      { isLoggedIn &&
        <>
          <div className="div">
              Unmeet: {unmeetProfiles.length}
          </div>
          {/* <div className="div">
              Liked: {likedProfiles.length}
            </div>
            <div className="div">
              Passed: {passedProfiles.length}
            </div> */}
          <div className="card-cover">
            { unmeetProfiles.length == 0 && <h1>You met all profile. Please wait for more!</h1>}
            { unmeetProfiles.length > 0 && <Card profile={unmeetProfiles[0]} onLike={onLike} onPass={onPass} />}
          </div>

          <Snackbar open={snackbar.open} autoHideDuration={1000}
            onClose={() => setSnackBar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={snackbar.type}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </>
      }

    </div>
  );
}

export default App;
