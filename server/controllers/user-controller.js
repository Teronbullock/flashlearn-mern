import pkg from 'pg/lib/defaults.js';
import { asyncHandler, authToken } from '../lib/utils.js';
import Users from '../models/users-model.js';
import { validationResult } from 'express-validator';

const { user } = pkg;


/**
 * user register
 */
export const postUserRegister = asyncHandler(
  async (req, res, next) => {
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    const {user_name,user_email,user_pass, user_confirm_pass} = req.body;

    const formData = {
      user_name,
      user_email,
      user_pass,
    };

    // confirm that all fields are filled out
    if ( Object.values(formData).some(value => value == null || value === '') ) {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    // confirm that user typed same password twice
    if (user_pass !== user_confirm_pass) {  
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
          userId: user.ID,
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
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
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
            userId: user.ID,
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


// get user profile
export const getUserProfile = asyncHandler(
  async (req, res, next) => {

    const user = await Users.findByPk(req.params.userId);
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
    const userId = req.params.userId;
    const formData = {};

    if (!email && !old_password && !password && !confirm_password) {
      const err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    const user = await Users.findOne({ where: { ID: userId }}, { raw: true });
    const oldPasswordMath = Users.comparePassword(userId, old_password, user.user_pass);


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
      where: { ID: userId }, 
      raw: true,
      individualHooks: true,
    });

  
    if (updatedUser[0] === 0) {
      const err = new Error('User not found.');
      err.status = 400;
      return next(err);
    } else {

      console.log('User updated successfully.');
      res.redirect(`/profile/${userId}`);
    }
    
    

  },
  'Error updating user data: ',
  500
);
