import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import setRoutes from './routes/set-routes.js';
import infoRoutes from './routes/info-route.js';
import profileRoutes from './routes/profile-routes.js';
import cookieParser from 'cookie-parser'; 
import checkAuth from './middleware/check-auth.js';
import {flattenError, z, ZodError } from 'zod';


const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(helmet());
app.use(compression());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sets', checkAuth, setRoutes);
app.use('/api/profile', checkAuth, profileRoutes);
app.use('/api', infoRoutes);

// disable favicon requests
app.use('/favicon.ico', (req, res, next) => {
  // Return a 204 No Content response
  res.status(204).end();
});

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err = new Error('Not Found ');
  (err as any).status = 404;
  next(err);
});


// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let cause = err?.cause || null;
  let validationErr: Record<string, string[]> | null = null;

  // Handle Zod Validation errors
  if (err instanceof ZodError) {
    status = 400;
    message = 'Validation Error';
    const flattened = z.flattenError(err);
    validationErr = flattened.fieldErrors;
  }

  // Log the error details
  if (process.env.NODE_ENV !== 'production') {
    console.error("Error Handler: ");
    console.error("Status: ", status);
    console.error("Message: ", message);
    cause ? console.error("Cause: ", cause) : '';
    console.error("Stack: ", err.stack);
  } else {
    console.error(message);
  }
  
  // console.log('LAST STOP: ', {message, validationErr});
  // sends res to client
  res.status(status).json({
    status,
    error: {
      message, 
      validationErr
    },
  });

});



export default app;
