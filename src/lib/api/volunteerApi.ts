import axios from "axios";

export const getMemberOrg = async () => {
  try {
    const res = await axios.get("/members/organizations");
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// post 함수
// zutand 생성
// com에서 호출
