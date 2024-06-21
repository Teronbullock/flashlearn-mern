
// Check if User has authorization to view page
export const midCheckUsersAuth = (req, res, next) => {
  if ( req.session && req.session.userId ) {

    res.locals.userId = req.session.userId;
    return next();
  } else {
    let err = new Error('User must be logged in to view page.');
    err.status = 401;
    return next(err);
  }
}


// Check if User has authorization to redirect
// export const midCheckUserAuthRedirect = (req, res, next) => {
//   if (req.params.userId == req.session.userId ) {

//     return next();
//   } else {
//     let err = new Error('You are not authorized to view this page.');
//     err.status = 403;
//     return next(err);
//   }
// }