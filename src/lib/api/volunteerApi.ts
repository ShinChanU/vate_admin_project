import axios from "axios";
import { OrgProps } from "lib/zustand/organization";

export const getMemberOrg = async () => {
  try {
    const res = await axios.get("/members/organizations");
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const postOrganization = async (data: OrgProps) => {
  const { name, manager, contact, address } = data;
  try {
    const res = await axios.post("/vol/organizations", {
      name,
      manager,
      contact,
      address,
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateOrganization = async (data: OrgProps) => {
  const { id, name, manager, contact, address } = data;
  try {
    const res = await axios.put(`/vol/organizations/${id}`, {
      name,
      manager,
      contact,
      address,
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteOrganization = async (id: any) => {
  try {
    const res = await axios.delete(`/vol/organizations/${id}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getOrganization = async (id: number | any) => {
  try {
    const res = await axios.get(`/vol/organizations/${id}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// post 함수
// zutand 생성
// com에서 호출
