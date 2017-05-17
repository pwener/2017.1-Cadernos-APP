import { USER_SET, USER_ERRORS, USER_SENDING_DATA, USER_LOGIN, USER_AUTHENTICATED, USER_LOGOUT, CLEAN_USER_AUTHENTICATION_ERRORS, USER_REGISTER } from '../config/actions-types';

import axios, { setAuthorizationToken } from '../config/axios';

export const userSet = (user) => {
  return {
    type: USER_SET,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    }
  }
};

export const userLogin = (user) => {
  return {
    type: USER_LOGIN,
    user: {
      email: user.email,
      password: user.password
    }
  }
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
    user: {
      email: '',
      password: ''
    }
  }
};

export const userSendingData = (sendingData) =>{
  return {type: USER_SENDING_DATA, sendingData}
}

export const userAuthenticated = (authenticated) => {
  return {type: USER_AUTHENTICATED, authenticated}
}

export const userErrors = (errors) =>{
  return {
    type: USER_ERRORS,
    errors
  }
}

export const asyncCreateUser = (userData) => {
  return (dispatch) => {
    dispatch(userSendingData(true));

    axios.post(`/users`, {
      user: {...userData, email_confirmation: userData.email}
    })
    .then(feedBack => {
      setAuthorizationToken(feedBack.headers.auth_token);
      dispatch(userSet({...feedBack.data, password: userData.password}));
      dispatch(userSendingData(false));
      dispatch(userRegister(true));
    })
    .catch(err => {
      if (err.response && err.response.data){
        console.log(err.response.data);
        dispatch(userRegister(false));
        dispatch(userErrors(err.response.data));
      } else {
        console.log(err);
        dispatch(userRegister(false));
      }
      dispatch(userSendingData(false));
    });
  }

}

export const asyncEditUser = (userData) => {
  return (dispatch) => {
    dispatch(userSendingData(true));

    axios.patch(`/users/${userData.id}`, {
      user: {...userData, email_confirmation:userData.email}
    })
    .then(response => {
      dispatch(userSet({...response.data, password: userData.password}));
      dispatch(userUpdate(true));
    })
    .catch(err => {
      dispatch(userUpdate(false));
      if (err.response && err.response.data) {
        console.log(err.response.data);
        dispatch(userErrors(err.response.data));
      } else {
        console.error(err);
      }
    })
    .finally(() => {
      dispatch(userSendingData(false));
    });
  }
}

export const asyncUserLogin = (userData) => {
  return (dispatch) => {
    dispatch(userSendingData(true));
    axios.post(`/authenticate`, {
      email: userData.email, password: userData.password
    })
    .then(feedBack => {
      //console.log(feedBack.data.user)
      //console.log(feedBack.data.auth_token)
      setAuthorizationToken(feedBack.data.auth_token);
      dispatch(userLogin(userData));
      dispatch(userAuthenticated(true));
      dispatch(userSendingData(false));
    })
    .catch(err => {
      if (err.response && err.response.data){
        console.log(err.response.data);
        dispatch(userErrors(err.response.data));
      }else{
        console.log(err);
      }
      dispatch(userSendingData(false));
    });
  }

}

export const asyncUserLogout = () => {
  return (dispatch) => {
    dispatch(userAuthenticated(false));
    dispatch(userLogout());
    setAuthorizationToken("");
  }
}

export const cleanUserErrors = () => {
  return{
    type: CLEAN_USER_AUTHENTICATION_ERRORS,
    error: {}
  }
}

export const userRegister = (isRegistered) => {
  return{
    type: USER_REGISTER,
    isRegistered
  }
}

export const userUpdate = (isUpdated) => {
  return{
    type: USER_UPDATE,
    isUpdated
  }
}