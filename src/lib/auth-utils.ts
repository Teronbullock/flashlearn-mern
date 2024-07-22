import apiRequest from "./api";

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
export const setUserAndToken = (dispatch, userId: string, token: string) => {
  // sets the token expiration time to 15 minutes
  const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 15);

  console.log('This is the tokenExpTime:', tokenExpTime);
  if (!userId || !token || !tokenExpTime) {
    throw new Error('userId, token, and tokenExpTime are required');
  }

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




export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const res = await apiRequest({
      method: 'post',
      url: '/api/user/refresh',
      data: { refresh_token: refreshToken },
      src: 'refreshAuthToken',
    });  

    if (res.status === 200 && res.data) {
      const { token, expiration } = res.data;
      return { token, expiration: new Date(expiration) };
    } else {
      throw new Error(`Error refreshing token ${res.status}`);
    }

  } catch (error) {
    console.error("Error refreshing auth token:", error);
    return null;
  }

};