import { getConnection } from 'typeorm';

export const validateGroup = async (req, res) => {
  const { group } = req.query;
  const repo = getConnection().getRepository('Group');
  const groupsName = await repo.findOne({
    where: { id: group },
  });
  res.render('validate-group', {
    groupsName,
  });
};
