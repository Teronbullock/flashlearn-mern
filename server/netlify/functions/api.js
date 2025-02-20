import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import userRoutes from '../../routes/user-routes.js';
import setRoutes from '../../routes/set-routes.js';
import cookieParser from 'cookie-parser'; 
import checkAuth from '../../middleware/check-auth.js';


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
app.use('/api/user', userRoutes);
app.use('/api/set', checkAuth, setRoutes);

// disable favicon requests
app.use('/favicon.ico', (req, res, next) => {
  // Return a 204 No Content response
  res.status(204).end();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Route Not Found ');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const stack = err.stack;
  const cause = err?.cause || "No cause available";
  
  // Log the error details
  if (process.env.NODE_ENV !== 'production') {
    console.error(`${status} - Cause: ${cause}`);
    console.error(stack);
  } else {
    console.error(message);
  }

  res.status(status).json({
    error: message,
    status,
  });
  
});

export const handler = serverless(app);