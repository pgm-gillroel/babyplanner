import { getConnection, getRepository } from 'typeorm';

export const agenda = async (req, res) => {
  const userRepository = getConnection().getRepository('User');
  const user = await userRepository.findOne({
    where: { id: req.user.userId },
    relations: ['baby'],
  });
  const Months = [
    'Jan',
    'Feb',
    'Maa',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ];
  const visitRepository = getConnection().getRepository('Visit');
  const visits = await visitRepository.find({
    where: { baby: user.baby[0] },
    relations: ['baby', 'contacts'],
  });
  const dataVisits = [];
  visits.sort((a, b) => a.date - b.date);
  visits.forEach((v) => {
    // eslint-disable-next-line prefer-destructuring
    const vistitId = v.id;
    const vDate = new Date(v.date);
    const contact = v.contacts[0];
    const day = vDate.getDate();
    const month = vDate.getMonth();
    const hours =
      vDate.getHours() < 10 ? `0${vDate.getHours()}` : vDate.getHours();
    const minutes =
      vDate.getMinutes() < 10 ? `0${vDate.getMinutes()}` : vDate.getMinutes();
    const visit = {
      id: vistitId,
      contact,
      day,
      month,
      year: vDate.getFullYear(),
      timeString: `${day} ${Months[month]} - ${hours}:${minutes}u`,
      name: `${contact.firstname} ${contact.lastname}`,
      status: v.status,
      avatar: contact.avatar,
    };
    dataVisits.push(visit);
  });

  const data = {
    user: { userId: req.user.userId, userEmail: req.user.email },
    confirmedVisits: dataVisits.filter((v) => v.status === 'Confirmed'),
    pendingVisits: dataVisits.filter((v) => v.status === 'Pending'),
    notConfirmedVisits: dataVisits.filter((v) => v.status === 'Not Confirmed'),
  };

  res.render('agenda', { data });
};
