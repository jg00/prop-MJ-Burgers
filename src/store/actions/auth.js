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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

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
        // console.log(response.data);

        // Return a Date object represending the calculated expiration date.  (expiresIn (seconds)) * 1000  converted to milliseconds b/c JavaScript time works in milliseconds.
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        // Store token, expirationDate(based on ExpiresIn Info), userid
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId)); // Fields - idToken, localId
        dispatch(checkAuthTimeout(response.data.expiresIn)); // expiresIn: '3600' (3600 secs from Firebase)
      })
      .catch(err => {
        // console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

// Called from Auth.js on load
// Whenever we load the app and/or user logs in we want to check
// a. If token has not expired then update the state of the user in the redux store (dispatch AUTH_SUCCESS).
// b. also, make sure 'automatic' log out of user is enabled (ie the timer)
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate")); // returns string.  Convert to Date object.
      if (expirationDate <= new Date()) {
        dispatch(logout());
      }
      // Set redux store
      else {
        const userId = localStorage.getItem("userId");

        // For 'auto' log in of user upon app refresh
        dispatch(authSuccess(token, userId));

        // For starting timer for 'auto' logging out of user upon token expiration
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        ); // Returns difference in milliseconds but we need to pass seconds to checkAuthTimeout()
      }
    }
  };
};
