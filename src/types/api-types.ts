export interface apiRequestObj {
    method?: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    src?: string;
}

export interface apiRequest {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: any;
  src?: string;
}