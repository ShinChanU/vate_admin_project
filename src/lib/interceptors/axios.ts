import axios from "axios";
import * as authAPI from "lib/api/authApi";

let refresh = false; // 무한 루프 방지

// axios response error시 인터셉터 발생, refresh 토큰 으로 access 발급
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (!refresh) {
      if (error.response.data.statusCode === 400) {
        refresh = true;
        const response = await authAPI.refresh(); // new AccessToken
        if (response.status === 200) {
          axios.defaults.headers.common["accesstoken"] =
            response.headers.accesstoken;
          return axios(error.config);
        }
      }
    }
    refresh = false;
    return error;
  }
);
