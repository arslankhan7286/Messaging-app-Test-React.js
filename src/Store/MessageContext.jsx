import React, { useReducer } from "react";
import { createContext } from "react";

export const MessageStore = createContext();
const initialState = {
  messages: [],
  message:null,
  sentMessages:[],
  token:null,
  error:"",
};
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload)
      return {
          ...state,
          token:action.payload
      };
      case "LOGOUT":
      return {
          ...state,
          token:null
      };
    case "CREATED_MESSAGE":
      return {
        ...state,
        messages: action.payload,
        error:""
      };
      case "GET_ALL_MESSAGES":
      return {
        ...state,
        messages: action.payload,
        error:""
      };
      case "GET_ALL_SENT_MESSAGES":
      return {
        ...state,
        sentMessages: action.payload,
        error:""
      };
      case "DELETE":
        return {
          ...state,
          success: action.payload,
          error:""
        };
        case "DETAIL":
        return {
          ...state,
          message: action.payload,
          error:""
        };
        case "ERROR":
          return {
            ...state,
            error:action.payload
          };
          case "SET_TOKEN":
          return {
            ...state,
            token:action.payload
          };
    default:
      return state;
  }
}
const MessageContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <MessageStore.Provider value={value}>
      {props.children}
    </MessageStore.Provider>
  );
};

export default MessageContext;
