import AXIOS from '../Config/Axios';
import headers from '../helpers/headers';
import Prefix from '../Config/ApiPrefix';

const Project = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/project`, { headers: headers() });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/project`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/project/${id}`, { headers: headers() });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/project/${data.id}`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/project/${id}`, { headers: headers() });
  },
};

export default Project;
