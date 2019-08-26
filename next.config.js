const axios = require('axios');

const headers = {
  Authorization:
    'Bearer OV6MiJ9fWR0wxmG4maXq30BnjZWp6G5CV0slNydMPJLE069u935ArKKlYJGA'
};

const getAllRooms = async () => {
  try {
    const res = await axios({
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      method: 'get',
      headers
    });
    const data = await res.data;
    return data.items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' }
    };
    const rooms = await getAllRooms();

    rooms.forEach(room => {
      paths[`/room/${room.id}`] = {
        page: `/room/[id]`,
        query: { id: room.id }
      };
    });

    return paths;
  }
};

module.exports = config;
