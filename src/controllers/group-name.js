import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const groupName = (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  res.render('group-name', { formErrors });
};

export const postGroupName = async (req, res, next) => {
  try {
    // user data from token
    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.TOKEN_SALT);
    req.user = user;

    const userRepository = getConnection().getRepository('User');
    const userData = await userRepository.findOne({
      where: { id: req.user.userId },
    });

    const groupRepository = getConnection().getRepository('Group');

    const group = await groupRepository.findOne({
      where: { name: req.body.newGroup },
    });

    const groupname = await groupRepository.findOne({
      where: { name: req.body.groupName },
    });

    if (group) {
      req.formErrors = [{ message: 'Group bestaat reeds.' }];
      console.log(req.formErrors);
      return next();
    }

    const createdGroup = await groupRepository.save({
      name: req.body?.groupName ? req.body.groupName : req.body.newGroup,
      user: {
        id: userData.id,
      },
    });

    // go to family settings
    res.redirect(`/group-settings?group=${createdGroup.id}`);
  } catch (e) {
    return next(e.message);
  }
};
