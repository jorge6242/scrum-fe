import AXIOS from '../Config/Axios';
import headers from '../helpers/headers';
import Prefix from '../Config/ApiPrefix';

const Sprint = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/sprint`, { headers: headers() });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/sprint`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/sprint/${id}`, { headers: headers() });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/sprint/${data.id}`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/sprint/${id}`, { headers: headers() });
  },
};

export default Sprint;
