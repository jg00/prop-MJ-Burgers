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

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// Scenario: User logged in but unaware token has expired.
// 'Actively' keep track of if/when token expires.
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    // After token expiry time reached dispatch logout 'actively'.
    setTimeout(() => {
      // For now this will clear the store but we will implement something when the user logs out including when he/she 'deliberately' logs out to give the user an indication that he/she is not logged in anymore.
      dispatch(logout());
    }, expirationTime * 1000); // 1000ms = 1sec
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
        dispatch(checkAuthTimeout(response.data.expiresIn)); // expiresIn: '3600' (3600 secs from Firebase)
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
