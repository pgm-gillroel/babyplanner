export const importContacts = (req, res) => {
  const { userId } = req.user;
  res.render('import-contacts', { userId });
};
