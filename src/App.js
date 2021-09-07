import React, { useContext , useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Inbox from "./compnents/Inbox/Inbox.jsx";
import Layout from "./compnents/Layout/layout.jsx";
import LogIn from "./compnents/LogIn/index.jsx";
import Sent from "./compnents/sent/Sent.jsx";
import { MessageStore } from "./Store/MessageContext.jsx";
import { getApiInceptor } from "./Utils/AxiosInstance.js";

const axios = getApiInceptor()
function App() {
  const {state , dispatch} = useContext(MessageStore)
  const {token} = state
  useEffect(() => {
  // getStorData()
  }, [])
  const getStorData=async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}messages/`)
      if(response.data){
        dispatch({type:"GET_ALL_MESSAGES" , payload:response.data})
        if(localStorage.getItem('Token')){
          dispatch({type:"SET_TOKEN" , payload:localStorage.getItem("Token")})

        }
      }
    } catch (error) {
      dispatch({type:"ERROR" , payload:"No Messages found"})
    }

//getAllSent
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}messages/sent/`)
      if(response.data){
        dispatch({type:"GET_ALL_SENT_MESSAGES" , payload:response.data})
      }
    } catch (err) {
        dispatch({type:"ERROR" , payload:"No Messages found"})
    }

  }
  return (
    <BrowserRouter>
      {true ? (
        <Switch>
          <Layout>
            <Route exact path="/"  component={Inbox} />
            <Route exact path="/sent"  component={Sent} />
          </Layout>
        </Switch>
      ) : (
        <Route exact path="/login" component={LogIn} />
      )}
    </BrowserRouter>
  );
}

export default App;
