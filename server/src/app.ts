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
import errorHandler from './middleware/error-handler.js';


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
app.use(errorHandler);

export default app;
