import axios from "axios";
import { OrgProps } from "lib/zustand/organization";
import { ActProps } from "lib/zustand/registerStore";

export const getMemberOrg = async () => {
  try {
    const res = await axios.get("/members/organizations");
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

export const getActivityApi = async (id: number) => {
  try {
    const res = await axios.get(`/vol/organizations/${id}/activities`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getSessions = async (id: number) => {
  try {
    const res = await axios.get(`/vol/activities/${id}/sessions`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getSessionDate = async (id: number, date: string) => {
  try {
    const res = await axios.get(`/vol/activities/${id}/sessions?date=${date}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getSessionApplicants = async (id: number) => {
  try {
    const res = await axios.get(`/vol/sessions/${id}/applicants`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const postActivityApi = async (data: ActProps) => {
  try {
    const res = await axios.post("/vol/activities", data);
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

export const updateApplicantAuth = async (id: number, isAuthorized: string) => {
  try {
    const res = await axios.put(`/members/application/${id}/authorization`, {
      isAuthorized,
    });
    console.log(res);
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

// post 함수
// zutand 생성
// com에서 호출

// https://www.wanted.co.kr/wd/127594
