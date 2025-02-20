import Users from '../models/users-model.js';

const getUserId = async (req, res, next) => {
  const { userSlug: slug } = req.params;

  try {
    const user = await Users.findOne({
      raw: true,
      where: { slug },
    });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Error getting user ID'});
  }
};

export default getUserId;