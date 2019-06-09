import AXIOS from '../Config/Axios';
import headers from '../helpers/headers';
import Prefix from '../Config/ApiPrefix';

const Team = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/team`, { headers: headers() });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/team`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/team/${id}`, { headers: headers() });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/team/${data.id}`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/team/${id}`, { headers: headers() });
  },
  createUsersTeam(data) {
    return AXIOS.post(
      `${Prefix.api}/users-team`,
      {
        ...data,
      },
      { headers: headers() },
    );
  },
};

export default Team;
