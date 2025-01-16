import express from 'express';
import bodyParser from 'body-parser';
import db from './db/database.js';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user-routes.js';
import setRoutes from './routes/set-routes.js';
import cookieParser from 'cookie-parser'; 
import checkAuth from './middleware/check-auth.js';


// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/user', userRoutes);
app.use('/set', checkAuth, setRoutes);


// disable favicon requests
app.use('/favicon.ico', (req, res, next) => {
  // Return a 204 No Content response
  res.status(204).end();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found ');
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  console.log('Error - ', message + '\n', 'Status: ', status, '\n');
  console.log('Stack:', err.stack);

  res.status(status).json({
    error: message,
    msg: message,
    status: status,
  });
  
});


//Server
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(
      'Error: Could not connect to the database. Server will not start until database connection is made. ',
      error
    );
  }
})();

const port = process.env.PORT || 5001;
const currentWorkingDirectory = process.cwd();
const keyPath = path.resolve(currentWorkingDirectory, 'certs', 'key.pem');
const certPath = path.resolve(currentWorkingDirectory, 'certs', 'cert.pem');

if(process.env.NODE_ENV === 'production') {
  const server = https.createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }, app
  ).listen(port, () => {
    console.log(`Express app listening on https://localhost:${port}`);
  });

} else {
  app.listen(port, ()=> {
    console.log(`Express app listening on http:serverIP:${port}`);
  });
}