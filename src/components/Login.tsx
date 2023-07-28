import React from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(8),
    },
    title: {
      marginBottom: theme.spacing(4),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    loginButton: {
      marginBottom: theme.spacing(4),
    },
  })
);

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Welcome Back!
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        className={classes.input}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        className={classes.input}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.loginButton}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
