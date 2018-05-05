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
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        username: data.data.username,
      });
    }
  })

}

export { checkUser }
