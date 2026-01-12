import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import Users from '../models/users-model.js';

/**
 * -- get user profile --
 */
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    throw new Error('User credentials not found.');
  }

  const {user_email} = await Users.findOne({ where: { id: userId } });
  return res.status(200).json({
    user_email,
  });
};


/**
 * -- put update user email --
 */
export const putUpdateUserEmail = async (req, res) => {
  let errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new Error('All fields required.');
  }
  
  const { user_email, user_pass: userOldPass} = req.body;
  const userId = req.userId;

  if(!userId){
    throw new Error('User credentials not found.');
  }

  // check if user exists
  const {user_pass} = await Users.findOne({ where: { id: userId } }, { raw: true });

  const isOldPassMatch = await bcrypt.compare(userOldPass, user_pass);
  // check if old password matches
  if (!isOldPassMatch) {
    throw new Error('invalid credentials.');
  }


  // update user email
  const updatedUser = await Users.update({user_email},
    {
      where: { id: userId },
      raw: true,
      individualHooks: true,
    }
  );

  // check if user was updated
  if (updatedUser[0] === 0) {
    throw new Error('User not found.');
  }

  res.status(200).json({
    msg: 'User updated successfully.',
  });

};


/**
 * -- put user password --
 */
export const putUpdateUserPassword = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error('All fields required.');
  }

  const { user_old_pass, user_pass, user_pass_confirm } = req.body;
  const userId = req.userId;

  // add user data to formData
  const formData = {
    user_pass,
  };

  // check if user exists
  const user = await Users.findOne({ where: { id: userId } }, { raw: true });

  // check old password match
  const isOldPassMatch = await bcrypt.compare(user_old_pass, user.user_pass);

  if (!isOldPassMatch) {
    throw new Error('Old password is incorrect.');
  }

  // confirm that password and confirm password match
  if (user_pass !== user_pass_confirm) {
    throw new Error('Passwords do not match.');
  }

  // update user data
  const updatedUser = await Users.update(formData, {
    where: { id: userId },
    raw: true,
    individualHooks: true,
  });

  // check if user was updated
  if (updatedUser[0] === 0) {
    throw new Error('User not found.');
  }

  res.status(200).json({
    msg: 'User updated successfully.',
  });

};