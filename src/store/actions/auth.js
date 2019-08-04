import axios from "axios";
import * as actionTypes from "./actionTypes";
import apiKey from "../../apiKey";

// Set a loading state, show spinner
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`; // Sign up
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`; // Sign in
    }

    // Sign up or Sign in and get token (Firebase Auth Rest API)
    axios
      .post(url, authData)
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId)); // Fields - idToken, localId
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
