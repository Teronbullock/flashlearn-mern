import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiReq {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: object;
  src?: string;
  config?: {
    headers: object;
  };
}

type DebugOption = 'all' | 'input' | 'output' | undefined;

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
const apiRequest = async (req: ApiReq, debugMode?: DebugOption) => {
  const { method = 'get', url, data, config, src } = req;
  let seeInput = false;
  let seeOutput = false;

  switch (debugMode) {
    case 'all':
      seeInput = true;
      seeOutput = true;
      break;
    case 'input':
      seeInput = true;
      break;
    case 'output':
      seeOutput = true;
      break;
    default:
      break;
  }

  if (seeInput) {
    console.log(
      'api Request: ',
      '\nsrc: ',
      src,
      '\nMethod: ',
      method,
      '\nURL: ',
      url,
      '\nData: ',
      data,
      '\nConfig: ',
      config
    );
  }

  try {
    let res: AxiosResponse;

    switch (method) {
      case 'get':
        res = await axios.get(url, config);
        break;
      case 'post':
        res = await axios.post(url, data, config);
        break;
      case 'put':
        res = await axios.put(url, data, config);
        break;
      case 'delete':
        res = await axios.delete(url, config);
        break;
      default:
        throw new Error('Unsupported method');
    }

    if (!res.data) {
      throw new Error('Missing data in response');
    }

    if (seeOutput) {
      console.log(
        `api response: Status [${res.status}] \nSrc: ${src}, \nRes:`,
        res.data
      );
    }

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        error.response?.data?.error || error.message,
        error.stack
      );
      throw error.response?.data?.error || error.message;
    } else {
      console.error(error);
      throw error;
    }
  }
};

export default apiRequest;
