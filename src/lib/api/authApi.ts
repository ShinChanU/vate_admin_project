import axios from "axios";

// 로그인
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

// 회원가입
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

// accessToken으로 user 정보 업데이트
export const userCheck = async () => {
  try {
    const response = await axios.get("/center/auth-check");
    return response;
  } catch (e: any) {
    return e.response;
  }
};

// refreshToken으로 accessToken 업데이트
export const refresh = async () => {
  const response = await axios.get("/center/auth", {
    validateStatus: function (status) {
      // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
      return status < 500;
    },
  });
  return response;
};

// 로그아웃
export const logout = async () => {
  try {
    const res = await axios.post("/center/logout");
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};
