import AXIOS from '../Config/Axios';
import headers from '../helpers/headers';
import Prefix from '../Config/ApiPrefix';

const Role = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/role`, { headers: headers() });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/role`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/role/${id}`, { headers: headers() });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/role/${data.id}`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/role/${id}`, { headers: headers() });
  },
};

export default Role;
