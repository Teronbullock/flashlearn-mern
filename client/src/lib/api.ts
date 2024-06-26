import { apiRequestObj } from '../types/api-types';
import axios, { AxiosResponse } from 'axios';


/**
 *  -- API Request Function --
 * The function takes an object with the following properties:
 * @param apiObj 
 * 
 * The get request is the default method.
 * 
 *  - method[optional] : 'get' | 'post' | 'put' | 'delete'
 *  - url: string
 *  - data[optional]: The data to be sent with the request
 *  - src[optional]: The source of the request
 * 
 * @returns The response from the API
 * 
 * @throws Error if the API call fails
 * 
 * @example
 * const res = await apiRequest({
 *  method: 'get',
 *  url: '/api/set/user/1',
 *  data: { id: 1 },
 *  src: 'Dashboard'
 *  }); 
 */
export const apiRequest = async (apiObj: apiRequestObj) => {
  const { method = 'get', url, data, src } = apiObj;

  if (data) {
    console.log(`api Request: \nSrc: ${src} \nMethod: ${method} \nURL: ${url} \nData:`, data);

  } else {
    console.log(`api Request: \nSrc: ${src} \nMethod: ${method} \nURL: ${url}`);
  }

  try {
    let res: AxiosResponse;

    switch (method) {
      case 'get':
        res = await axios.get(url);
        break;
      case 'post':
        res = await axios.post(url, data);
        break;
      case 'put':
        res = await axios.put(url, data);
        break;
      case 'delete':
        res = await axios.delete(url);
        break;
      default:
        throw new Error('Unsupported method');
    }

    console.log(`api response: \nSrc: ${src}, \nRes:`, res.data);

    return res;
  } catch (error) {
    console.error('API call error: ', src, error);
    throw error;
  }

};
