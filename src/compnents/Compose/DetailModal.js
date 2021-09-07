import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Avatar, Button, Container, CssBaseline, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { EmailOutlined,  } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { getApiInceptor } from '../../Utils/AxiosInstance';
import { MessageStore } from '../../Store/MessageContext';
import moment from 'moment';
 
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
  typo:{
paddingBottom:20,
  }
}));


export default function DetailModal({ open ,handleClose }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(MessageStore);
  const {message } = state

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
      <div className={classes.paper}>
        <Avatar className={classes.avatar} onClick={()=>handleClose()}>
            <CloseIcon style={{color:"white" } }/>
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"#7684d2"}}>
          Message Detail
        </Typography>
        <Grid container spacing={3} direction="row">
           <Grid item md={6}>
               <Typography variant="h5" className={classes.typo}>Title : {message.title}</Typography>
               <Typography variant="body1" className={classes.typo}>Body : {message.body}</Typography>
               <Typography variant="body1" className={classes.typo}>Date : {moment(message.sent).format('MMMM Do YYYY  h:mm a')}</Typography>
           </Grid>
           <Grid item md={6} style={{textAlign:"right" }}>
           <Typography variant="body1">Sender : {message.sender}</Typography>
               <Typography variant="body1" className={classes.typo}>Receiver : {message.receiver}</Typography>
           </Grid>
        </Grid>
        
      </div>
    </Container>
      </Fade>
    </Modal>
  );
}
