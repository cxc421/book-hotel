import axios from 'axios';

const headers = {
  Authorization:
    'Bearer OV6MiJ9fWR0wxmG4maXq30BnjZWp6G5CV0slNydMPJLE069u935ArKKlYJGA'
};

export const getAllRooms = async () => {
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

export const getRoomById = async id => {
  const res = await axios({
    url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id,
    method: 'get',
    headers
  });
  const data = await res.data;
  return data;
};
