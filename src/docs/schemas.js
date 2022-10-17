export default {
  User: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      userMeta: {
        $ref: '#/components/schemas/UserMeta',
      },
      baby: {
        $ref: '#/components/schemas/Baby',
      },
      group: {
        $ref: '#/components/schemas/Group',
      },
      contacts: {
        $ref: '#/components/schemas/Contact',
      },
    },
  },
  UserInput: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      userMeta: {
        $ref: '#/components/schemas/UserMeta',
      },
      baby: {
        $ref: '#/components/schemas/Baby',
      },
      group: {
        $ref: '#/components/schemas/Group',
      },
      contacts: {
        $ref: '#/components/schemas/Contact',
      },
    },
    example: {
      email: 'gillesroels@outlook.com',
      password: 'gilles',
      userMeta: {
        firstname: 'Gilles',
        lastname: 'Roels',
        phoneNumber: '0485444444',
      },
      baby: {
        name: 'Jos',
        date: '1652434452268',
        weight: '3100',
        length: '55',
        photos:
          'https://www.babymatters.com/imagecache/generated/o/oxo-badje-banner-foto.jpg/module/blog/detail-photo/crops/oxo-badje-banner-foto.jpg/oxo-badje-banner-foto.jpg',
        gender: 'male',
      },
      group: {
        name: 'Familie',
        permissions: ['fotos'],
      },
      contacts: {
        firstname: 'Gilles',
        lastname: 'Roels',
        phoneNumber: '0496222222',
      },
    },
  },

  UserMeta: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      phoneNumber: { type: 'number' },
    },
  },

  Baby: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      date: { type: 'number' },
      weight: { type: 'number' },
      length: { type: 'number' },
      photos: { type: 'string' },
      gender: { type: 'string' },
    },
  },
  BabyInput: {
    properties: {
      name: { type: 'string' },
      date: { type: 'number' },
      weight: { type: 'number' },
      length: { type: 'number' },
      photos: { type: 'string' },
      gender: { type: 'string' },
    },
    example: {
      name: 'Jos',
      date: '1652434452268',
      weight: '3100',
      length: '55',
      photos:
        'https://www.babymatters.com/imagecache/generated/o/oxo-badje-banner-foto.jpg/module/blog/detail-photo/crops/oxo-badje-banner-foto.jpg/oxo-badje-banner-foto.jpg',
      gender: 'male',
    },
  },

  Group: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      permissions: { type: 'string' },
      contacts: {
        $ref: '#/components/schemas/Contact',
      },
    },
  },
  GroupInput: {
    properties: {
      name: { type: 'string' },
      permissions: { type: 'string' },
      contacts: {
        $ref: '#/components/schemas/Contact',
      },
    },
    example: {
      name: 'Familie',
      permissions: ['fotos'],
      contacts: {
        firstname: 'Gilles',
        lastname: 'Roels',
        phoneNumber: '0496222222',
      },
    },
  },

  Contact: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      phoneNumber: { type: 'number' },
      group: {
        $ref: '#/components/schemas/Group',
      },
      visits: {
        $ref: '#/components/schemas/Visit',
      },
    },
  },
  ContactInput: {
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      phoneNumber: { type: 'number' },
      group: {
        $ref: '#/components/schemas/Group',
      },
      visits: {
        $ref: '#/components/schemas/Visit',
      },
    },
    example: {
      firstname: 'Gilles',
      lastname: 'Roels',
      phoneNumber: '0496222222',
      group: {
        name: 'Familie',
        permissions: ['fotos'],
      },
      Visit: {
        status: 'accepted',
        date: '1652444022172',
      },
    },
  },

  Visit: {
    properties: {
      id: { type: 'number' },
      status: { type: 'string' },
      date: { type: 'number' },
      contacts: {
        $ref: '#/components/schemas/Contact',
      },
    },
  },
  VisitInput: {
    properties: {
      status: { type: 'string' },
      date: { type: 'number' },
      contacts: {
        $ref: '#/components/schemas/Contact',
      },
    },
    example: {
      status: 'accepted',
      date: '1652444022172',
      contacts: {
        firstname: 'Gilles',
        lastname: 'Roels',
        phoneNumber: '0496222222',
      },
    },
  },
};
