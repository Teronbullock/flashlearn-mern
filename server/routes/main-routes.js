import { Router } from 'express';


const router = Router();
// const { 
//   midCheckUsersAuth,
//   midCheckUserAuthRedirect
//  } = require('../middleware');







// GET / route
const mainRoutes = router.get('/', (req, res) => {
  console.log('main-routes.js');
  // res.render('index', { bodyClass: 'index' });
  res.send('Hello World');
});


export default mainRoutes;