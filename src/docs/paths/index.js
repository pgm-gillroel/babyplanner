import baby from './baby.js';
import user from './user.js';
import groups from './groups.js';
import contacts from './contacts.js';
import visits from './visits.js';

export default { ...user, ...baby, ...groups, ...contacts, ...visits };
