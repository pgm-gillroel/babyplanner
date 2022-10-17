import { getConnection } from 'typeorm';

export const selectContacts = async (req, res) => {
  const contactsRepository = getConnection().getRepository('Contact');

  const contacts = await contactsRepository.find({
    where: { user: req.user.userId },
    relations: ['user'],
  });

  const contactsUser = contacts.filter((c) => c.user.id === req.user.userId);
  contactsUser.sort((a, b) => {
    const fa = a.firstname.toLowerCase();
    const fb = b.firstname.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  const { group } = req.query;
  const repo = getConnection().getRepository('Group');
  const groupsName = await repo.findOne({
    where: { id: group },
  });

  res.render('select-contacts', {
    contactsUser,
    groupsName,
  });
};

export const PostSelectContacts = async (req, res, next) => {
  try {
    if (req.body.contacts === 0) {
      req.formErrors = [{ message: 'Geen contacten geselecteerd' }];
      return next();
    }

    const { group: groupId } = req.query;
    const groupRepository = getConnection().getRepository('Group');
    const group = await groupRepository.findOne({
      where: { id: groupId },
      relations: ['contacts'],
    });

    const userRepository = getConnection().getRepository('User');
    const user = await userRepository.findOne({
      where: { id: req.user.id },
    });

    const contactsRepository = getConnection().getRepository('Contact');
    const contact = await contactsRepository.find({
      relations: ['user'],
      where: { user },
    });

    const contactsId = [...group.contacts, ...req.body.contacts];

    const contactFilter = contact.filter(
      (c) => contactsId.filter((cId) => parseInt(cId) === c.id).length > 0
    );

    group.contacts = contactFilter;

    await groupRepository.save(group);

    res.redirect(`/validate-group`);
  } catch (e) {
    return next(e.message);
  }
};
