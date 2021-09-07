import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MessageStore } from '../../Store/MessageContext';
import logo from "../../images/messageLogo.png"
import { Divider, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    logout: {
      position: "absolute",
      bottom: "2%"
    },
    logo: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    logoTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#00b5ae"
    }

  }),
);

const navArray = [
  {
    icon: <InboxIcon />,
    text: "Inbox",
    path: "/"
  },
  {
    icon: <SendIcon />,
    text: "Sent",
    path: "/sent"
  },
]

export default function MessageBox() {
  const classes = useStyles();
  const history = useHistory()
  const { state, dispatch } = useContext(MessageStore)

  const handleClick = (path) => {
    history.push(path)
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("Token")
    history.push("/login")
  }
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" className={classes.logo}>
            <img src={logo} alt="logo" height="150px" width="150px" />
            <Typography className={classes.logoTitle}>Messaging App</Typography>
          </ListSubheader>
        }
        className={classes.root}
      >
        <Divider />
        {
          navArray.map((nav) => {
            return (
              <ListItem button onClick={() => handleClick(nav.path)}>
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.text} />
              </ListItem>
            )
          })
        }
        <Divider />
        <ListItem button className={classes.logout} onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
}
