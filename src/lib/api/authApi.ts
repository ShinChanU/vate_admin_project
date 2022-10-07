import axios from "axios";

export const login = async (userName: string, password: string) => {
  try {
    const res = await axios.post(`/center/login`, {
      userName,
      password,
    });
    axios.defaults.headers.common["accesstoken"] = res.headers.accesstoken;
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const signup = async (userName: string, password: string) => {
  try {
    const res = await axios.post(`/center/signup`, {
      userName,
      password,
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post("/center/logout");
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};
