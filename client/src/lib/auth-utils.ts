import { Dispatch } from 'react';

type Action = {
  type: 'LOGIN';
  payload: {
    userId: string;
    token: string;
    tokenExpTime: Date;
  };
};

/**
 *  -- setUserAndToken --
 * 
 *  This function sets the user ID, Token info and expiration date in the context and local storage
 * 
 * @param dispatch 
 * @param userId 
 * @param token 
 * @returns
 */
export const setUserAndToken = (dispatch: Dispatch<Action>, userId: string, token: string) => {
  // sets the token expiration time to 15 minutes
  const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 15);

  if (!userId || !token || !tokenExpTime) {
    throw new Error('userId, token, and tokenExpTime are required');
  }

  // dispatch values to the context
  dispatch({ 'type': 'LOGIN', 'payload': {
    userId,
    token,
    tokenExpTime
  }});

  // set the token in the local storage
  localStorage.setItem('flashlearn_userData', JSON.stringify({
    userId,
    token,
    tokenExpTime: tokenExpTime.toISOString()
  }));

  return;

};
