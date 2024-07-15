import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { apiRequest } from '../types/api-types';



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
const useFetchApi = ({method = 'get', url, data, src }: apiRequest ) => {
  const [res, setRes] = useState<AxiosResponse<any, any> | undefined>();
  const [resError, setResError] = useState();
  const [isLoading, setIsLoading] = useState(false);



  if (data) {
    // console.log(`api Request: \nSrc: ${src} \nMethod: ${method} \nURL: ${url} \nData:`, data);
  } else {
    // console.log(`api Request: \nSrc: ${src} \nMethod: ${method} \nURL: ${url}`);
  }

  useEffect(() => {
    (async () => {

      setIsLoading(true);
  
      if (url && method && isLoading) {
        try {
          let res: AxiosResponse;
  
          switch (method) {
            case 'get':
              res = await axios.get(url, data);
              break;
            case 'post':
              res = await axios.post(url, data);
              break;
            case 'put':
              res = await axios.put(url, data);
              break;
            case 'delete':
              res = await axios.delete(url, {data});
              break;
            default:
              throw new Error('Unsupported method');
          }
  
          if(res.status === 200 && res.data) {
            console.log(`api response: Status [${res.status}] \nSrc: ${src}, \nRes:`, res.data);
            setRes(res);
            setIsLoading(false);
          }
        } catch (error) {
          setResError(error);
        }
        console.log('This ran');
      }
      console.log('url and method are required', url, method);
    })();

  }, [url, method, data, src]);

  return { res, resError, isLoading };
};

export default useFetchApi;