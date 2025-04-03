import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface IApiRequest {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: object;
  src?: string;
  config?: AxiosRequestConfig;
}



/**
 *  -- useFetchData --
 * This hook takes an object with the following properties:
 * @param req - The request object
 *
 * The get request is the default method.
 *
 *  - method[optional] : 'get' | 'post' | 'put' | 'delete'
 *  - url: string
 *  - data[optional]: The data to be sent with the request
 *  - src[optional]: The source of the request
 * - config[optional]: The configuration object for the request
 *
 * @param debugMode - The debug mode option
 * - 'all': Show input and output
 * - 'input': Show input only
 * - 'output': Show output only
 *
 * @returns The response from the API (res)
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
const useFetchData = ({ method = 'get', url, data, config }: IApiRequest) => {

  if (import.meta.env.MODE === 'production') {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    if (!apiUrl) {
      console.error('VITE_API_URL is not defined in production');
    } else {
      url = url.replace('/api', apiUrl);
    }
  }
  
  const fetchData = async () => {
    try {
      const axiosConfig = {...config, withCredentials: true }
      const res = await axios[method](url, method === 'get' ? axiosConfig : data, axiosConfig);

      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };


  console.log('useFetchData Ran: ');
  return { fetchData,  error };
};

export default useFetchData;
