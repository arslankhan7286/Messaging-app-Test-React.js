import { Fab, IconButton, List } from "@material-ui/core";
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { MessageStore } from "../../Store/MessageContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Textsms from "@material-ui/icons/Textsms";
import { EmailOutlined } from "@material-ui/icons";
import { getApiInceptor } from "../../Utils/AxiosInstance";
import moment from "moment";
import ComposeModal from "../Compose/ComposeModal";
import DetailModal from "../Compose/DetailModal";
import DetailsIcon from '@material-ui/icons/Details';



const axios = getApiInceptor()
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    heading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2%",
      backgroundColor: "black",
      color: "white",
    },
    container: {
      margin: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      width: "100%",
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    text: {
      width: "100%",
      color: "green",
      fontWeight: "400px",
    }, date: {
      color: "gray"
    },
    btn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    fab: {
      position: "absolute",
      bottom: "4%",
      right: "4%",
      backgroundColor: "#282864",
      color: "white",
    }
  })
);

const Sent = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [currentBody, setCurrentBody] = React.useState({});
  const [bodyFlag, setBodyFlag] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [detailModal, setDetailModal] = React.useState(false);
  const [rendere, setRendere] = React.useState(false);
  const { state, dispatch } = useContext(MessageStore);
  const { sentMessages, error } = state;


  useEffect(() => {
    getAllMessages()
  }, [rendere])
  const getAllMessages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}messages/sent/`)
      if (response.data) {
        dispatch({ type: "GET_ALL_SENT_MESSAGES", payload: response.data })
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: "No Messages found" })
    }

  }
  const handleClose = () => {
    setIsOpen(false)
    setDetailModal(false)
    setRendere(!rendere)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleMessage = (id) => {
    let current = sentMessages.find((it) => it.id === id);
    setCurrentBody(current);

    setBodyFlag(!bodyFlag)
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}messages/${id}`)
      if (response.data.data) {
        dispatch({ type: "DELETE", payload: response.data.data })
      }
      setRendere(!rendere)
    } catch (error) {
      dispatch({ type: "ERROR", payload: "item not deleted " })
    }

  }
  const handleDetail = async (id) => {
    setDetailModal(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}messages/${id}`)
      console.log(response.data)
      if (response.data) {
        dispatch({ type: "DETAIL", payload: response.data })
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: "item can not be loaded" })
    }
  }
  return (
    <>
      {error !== "" ? <p style={{ color: "red" }}>{error}</p> : null}
      <Typography variant="h4" className={classes.heading}>
        Sent Messages
      </Typography>
      <div className={classes.demo}>
        <List dense={dense} style={{ height: "82vh", overflowY: "scroll" }}>
          {sentMessages.length > 0 && sentMessages.map((msg) => {
            return (
              <ListItem key={msg.id} onClick={() => handleMessage(msg.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Textsms />
                  </Avatar>
                </ListItemAvatar>
                <div style={{ display: "block" }}>
                  <ListItemText className={classes.text}
                    primary={msg.title}
                  />
                  {
                    bodyFlag && msg.sent === currentBody.sent &&
                    <textarea wrap="off" cols="60" rows="2" style={{ overflow: "auto", resize: "none", border: "none", backgroundColor: "#dbd5d6", paddingLeft: 10, resize: "none" }}>{bodyFlag && msg.sent === currentBody.sent ? currentBody.body : null}</textarea>
                  }
                  <div style={{ display: "flex" }}>
                    <p className={classes.date}>{`${moment(msg.sent).format('MMMM Do YYYY  h:mm a')}`} </p>
                    <p style={{ color: msg.read ? "green" : "red", paddingLeft: "5px" }}>{msg.read ? "✓✓" : "✓✓"}</p>
                  </div>
                </div>
                <ListItemSecondaryAction className={classes.btn}>
                  <p style={{ fontSize: 10, color: "lightslategrey" }}>receiver : {msg.receiver}</p>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(msg.id)}>
                    <DeleteIcon color={"secondary"} />
                  </IconButton>
                  <IconButton edge="end" aria-label="detail" onClick={() => handleDetail(msg.id)}>
                    <DetailsIcon color={"primary"} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Fab variant="extended" className={classes.fab} onClick={handleOpen}>
          <EmailOutlined className={classes.extendedIcon} />
          Compose New
        </Fab>
      </div>
      {
        isOpen && <ComposeModal open={isOpen} handleClose={handleClose} />
      }
      {
        detailModal && <DetailModal open={detailModal} handleClose={handleClose} />
      }
    </>
  );
};

export default Sent;

