import axios from "axios";

export const getMemberOrg = async () => {
  try {
    const res = await axios.get("/members/organizations");
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};
