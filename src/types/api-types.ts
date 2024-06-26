export interface apiRequestObj {
    method?: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    src?: string;
}