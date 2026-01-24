import serverless from 'serverless-http';
import app from '../../src/app';


console.log('API file loaded');
export const handler = serverless(app);