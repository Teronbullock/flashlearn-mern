import pkg from 'pg/lib/defaults.js';
import { asyncHandler, authToken } from '../lib/utils.js';
import Users from '../models/users-model.js';
// import jwt from 'jsonwebtoken';


const { user } = pkg;


/**
 * user register
 */
export const postUserRegister = asyncHandler(
  async (req, res, next) => {
    const formData = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_pass: req.body.user_pass,
    };

    // confirm that all fields are filled out
    if ( Object.values(formData).some(value => value == null || value === '') ) {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    // confirm that user typed same password twice
    if (formData.user_pass !== req.body.user_confirm_pass) {  
      let err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    try {
      // use schema method to insert document into PSQL 
      const user = await Users.create(formData);

      // create a token
      try {
        let token = authToken(user.ID, user.user_name);
        
        res.status(200).json({
          message: 'User registered successfully.',
          token: token,
          userID: user.ID,
          userName: user.user_name,
        });

      } catch (error) {
        console.log('Error creating token: ', error);
        return next(error);
      }

    } catch (error) {
      console.log('Error registering user: ', error);
      return next(error);
    }

  }
);


/**
 * user login
 */
export const postUserLogin = asyncHandler( 
  async (req, res, next) => {
    if (!req.body.user_name || !req.body.user_pass) {
      let err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }

    Users.authenticate(
      req.body.user_name,
      req.body.user_pass,
      (error, user) => {
        if (error || !user) {
          const err = new Error('Wrong username or password.');
          err.status = 401;
          return next(err);
        }
        
        // create a token
        try {
          let token = authToken(user.ID, user.user_name);

          res.status(200).json({
            message: 'User logged in successfully.',
            token: token,
            userID: user.ID,
            userName: user.user_name,
          });

        } catch (error) {
          return next(error);               
        }
      }
    );
  },
  'Error logging in: ',
  401
);


// get user logout
export const getUserLogOut = (req, res, next) => {
  if (req.session) {
    // delete session obj
    req.session.destroy( (err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });

  } 

};

// get user home redirect
export const getUserHomeRedirect = asyncHandler(
  async (req, res, next) => {

    res.redirect(`/home/${req.session.userID}`);
  },
  'Error retrieving user data: ',
  500
);

// get user home
export const getUserHome = asyncHandler(
  async (req, res, next) => {
    res.render('home', { route: 'home' });
  },
  'Error retrieving user data: ',
  500
);

// get user profile
export const getUserProfile = asyncHandler(
  async (req, res, next) => {

    const user = await Users.findByPk(req.params.userID);
    const data = {
      user_name: user.user_name,
      user_email: user.user_email,
    };
  

    res.render('profile', data);
  },
  'Error retrieving user data: ',
  500
);

// put user profile
export const putEditProfile = asyncHandler(
  async (req, res, next) => {
    const { email, old_password, password, confirm_password  } = req.body;
    const userID = req.params.userID;
    const formData = {};

    if (!email && !old_password && !password && !confirm_password) {
      const err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    const user = await Users.findOne({ where: { ID: userID }}, { raw: true });
    const oldPasswordMath = Users.comparePassword(userID, old_password, user.user_pass);


    if (!oldPasswordMath ) {
      const err = new Error('Old password is incorrect.');
      err.status = 400;
      return next(err);
    }

 
    if (password !== confirm_password) {
      const err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    formData.user_pass = password;
    formData.user_email = email;

    const updatedUser = await Users.update(formData, {
      where: { ID: userID }, 
      raw: true,
      individualHooks: true,
    });

  
    if (updatedUser[0] === 0) {
      const err = new Error('User not found.');
      err.status = 400;
      return next(err);
    } else {

      console.log('User updated successfully.');
      res.redirect(`/profile/${userID}`);
    }
    
    

  },
  'Error updating user data: ',
  500
);
