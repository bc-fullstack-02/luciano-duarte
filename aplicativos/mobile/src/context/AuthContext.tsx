import React, { ReactNode ,useReducer } from "react";
import jwt_decode from 'jwt-decode';
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

import { Auth, UserToken } from "../@types/auth";
import { Action } from "../@types/reducer";

interface IAuthContext {
  token: string | null;
  user: string | null;
  profile: string | null;
  isLoading: boolean,
  errorMessage: string | null;
  login?: () => void;
  register?: () => void;
  tryLocalLogin?: () => void;
  logout?: () => void;
};

const defaultValue = {
  token: null,
  user: null,
  profile: null,
  isLoading: true,
  errorMessage: null, 
};

const Context = React.createContext<IAuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode}) => {
  const reducer = (state: any, action: Action) => {
    //action: { type: string, payload: any }
    switch(action.type) {
      case "login":
        return {
          ... state,
          ... action.payload,
          errorMessage: null
        };
      case "user_created":
        return { ... state, errorMessage: null };
      case "logout":
        return { token : null, profile: null, user: null, errorMessage: null };
      case "add_error":
        return { ... state, errorMessage: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = async ({user, password}: Auth) => {
    try {
      const response = await api.post("/security/login", {user, password});
      const { acessToken } = response.data;
      const { profile, user: userName } = jwt_decode(acessToken) as UserToken;

      await SecureStore.setItemAsync("token", acessToken);
      await SecureStore.setItemAsync("user", userName);
      await SecureStore.setItemAsync("profile", profile);

      dispatch({
        type: "login",
        payload: { token: acessToken, profile, user: userName},
      });
    } catch(error){
      console.error(error);
      dispatch({
        type: "add_error",
        payload: "Houve um erro no login.",
      });
    }
  };

  const register = async ({user, password}: Auth) => {
    try {
      await api.post("/security/register", {user, password});

      dispatch({
        type: "user_created",
      });
    } catch(error){
      dispatch({
        type: "add_error",
        payload: "Houve um erro no cadastro.",
      });
    }
  };

  const tryLocalLogin = async () => {
    let token, user, profile;
    try {
      token = await SecureStore.getItemAsync("token");
      user = await SecureStore.getItemAsync("user");
      profile = await SecureStore.getItemAsync("profile");

      dispatch({type: "login", payload: { token, profile, user }});
    } catch(error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("profile");

      dispatch({
        type: "logout",
      });
    } catch(error){
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{
        ... state,
        login,
        register,
        tryLocalLogin,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };