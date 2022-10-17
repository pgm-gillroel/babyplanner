import { getConnection } from 'typeorm';

export const groupSettings = async (req, res) => {
  const inputs = {
    forms: [
      {
        name: "Toegang tot alle foto's",
        nameInput: 'photos',
      },
      {
        name: 'Kunnen jouw agenda bekijken',
        nameInput: 'agenda',
      },
      {
        name: 'Kunnen zelf afspraak verzetten',
        nameInput: 'visit',
      },
      {
        name: 'Speciaal verzoek doen',
        nameInput: 'request',
      },
    ],
  };

  const { group } = req.query;
  const repo = getConnection().getRepository('Group');
  const data = await repo.findOne({
    where: { id: group },
  });

  console.log(group);

  res.render('group-settings', {
    inputs,
    data,
  });
};
