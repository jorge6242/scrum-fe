import AXIOS from '../Config/Axios';
import headers from '../helpers/headers';
import Prefix from '../Config/ApiPrefix';

const Backlog = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/backlog`, {
      headers: headers()
    });
  },
  getMainBacklog() {
    return AXIOS.get(`${Prefix.api}/main-backlog`, {
      headers: headers()
    });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/backlog`, {
        ...data,
      }, {
        headers: headers()
      },
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/backlog/${id}`, {
      headers: headers()
    });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/backlog/${data.id}`, {
        ...data,
      }, {
        headers: headers()
      },
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/backlog/${id}`, {
      headers: headers()
    });
  },
};

export default Backlog;