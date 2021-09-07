import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Avatar, Button, Container, CssBaseline, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { EmailOutlined,  } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { getApiInceptor } from '../../Utils/AxiosInstance';
import { MessageStore } from '../../Store/MessageContext';
 
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: "black",
  },
  form: {
    width: '100%', // F
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


 const axios = getApiInceptor()
export default function ComposeModal({ open ,handleClose , render}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(MessageStore);
  const {error} = state
  const [message , setMessage] =useState({
      title:"",
      body:"",
      receiver:""
  })
  
 const handleSubmit =async()=>
 {
try {
   const response = await axios.post(`${process.env.REACT_APP_API_URL}messages/` , message)
if(response.data.data === "success"){
    dispatch({type:"CREATED_MESSAGE" , payload:response.data})
    handleClose()
}
} catch (error) {  
    dispatch({type:"ERROR" , payload:"SomeThing Went wrong"})
}
 }
 const handleChangeMessage =(e)=>{
     setMessage({
         ...message,
         [e.target.name]:e.target.value
     })
 }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
        
      <Fade in={open}>
      <Container component="main" maxWidth="md">
         
      <CssBaseline />
      {error !=="" ? <p style={{color:"red"}}>{error}</p>: null}
      <div className={classes.paper}>
        <Avatar className={classes.avatar} onClick={()=>handleClose()}>
            <CloseIcon style={{color:"white" } }/>
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"#7684d2"}}>
          Send Message here..
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Recipient"
            name="receiver"
            value={message.receiver}
            onChange={handleChangeMessage}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="title"
            label="Subject"
            value={message.title}
            onChange={handleChangeMessage}
          />
          <label style={{fontSize:20 , color:"grey"}}>Body</label>
          <TextareaAutosize
                aria-label="maximum height"
                placeholder="Please Type your message here"
                cols={115}
                minRows={10}
                maxRows={15}
                fullWidth
                name="body"
                value={message.body}
                onChange={handleChangeMessage}
/>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
      </Fade>
    </Modal>
  );
}
