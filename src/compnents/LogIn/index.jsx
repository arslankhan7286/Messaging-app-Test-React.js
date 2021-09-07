import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MessageStore } from '../../Store/MessageContext';
import { getApiInceptor } from '../../Utils/AxiosInstance';
import { useHistory } from 'react-router-dom';

// makeStyles m-ui/core/styles
const axios = getApiInceptor()
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const history = useHistory()
  const [user , setUser] =React.useState({
    username:"",
    password:""
  })
 const {state, dispatch} = useContext(MessageStore)
 const {error} = state
const handleChange =(e)=>{
setUser({
  ...user,
  [e.target.name]:e.target.value
})
}
const handleSubmit=async()=>{
  try {
 const res =await axios.post(`${process.env.REACT_APP_API_URL}api-token-auth/` , user)
 console.log( res.data.token)
 if(res.data){
   dispatch({type:"LOGIN" , payload:res.data.token})
  localStorage.setItem("Token" , res.data.token)
 }
 history.push("/")
  } catch (error) {
    dispatch({type:"ERROR" , payload:"Wrong Credentials Passed"})
  }
 
}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
     
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          {error !=="" ? <p style={{color:"red" , padding:20}}>{error}</p>: null}
        </form>
      </div>
    </Container>
  );
}