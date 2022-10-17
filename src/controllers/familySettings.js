import { getConnection } from 'typeorm';

export const familySettings = async (req, res) => {
  const { group } = req.query;
  const repo = getConnection().getRepository('Group');
  const data = await repo.findOne({
    where: { id: group },
  });

  res.render('family-settings', { data });
};
