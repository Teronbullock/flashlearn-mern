import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface IApiRequest {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: object;
  config?: AxiosRequestConfig;
}


/**
 *  -- API Request Function --
 * The function takes an object with the following properties:
 * @param req - The request object
 *
 * The get request is the default method.
 *
 *  - method[optional] : 'get' | 'post' | 'put' | 'delete'
 *  - url: string
 *  - data[optional]: The data to be sent with the request
 * - config[optional]: The configuration object for the request
 *
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
 *  });
 */
const apiRequest = async ({method = 'get', url, data, config }: IApiRequest ) => {
  
  if (import.meta.env.MODE === 'production') {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    if (!apiUrl) {
      console.error('VITE_API_URL is not defined in production');
    } else {
      url = url.replace('/api', apiUrl);
    }
  }

  try {
    const axiosConfig = {...config, withCredentials: true }
    const res = await axios[method](url, method === 'get' || method === 'delete' ? axiosConfig : data, axiosConfig);

    if(!res.data) {
      throw new Error('No data founded');
    }
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 && error.response?.data?.message === 'Not authorized') {
        throw error.response.data.error;
      }

      throw error.response?.data?.error || error.message;
    } else {
      console.log('error', error);
      throw error;
    }
  }
};

export default apiRequest;
