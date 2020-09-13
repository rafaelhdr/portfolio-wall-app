import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


function checkUser(setUserCallback) {

  return axios({
    method: 'GET',
    url: `${API_ROOT}/auth/me`,
    headers: { 'Accept': 'application/json' }
  }).then((response) => {
    const data = response.data;
    if (data.errors === null && data.data.user != null) {
      setUserCallback({
        id: data.data.user.id,
        first_name: data.data.user.first_name,
        last_name: data.data.user.last_name,
        username: data.data.user.username,
      });
    }
  })

}

export { checkUser }
