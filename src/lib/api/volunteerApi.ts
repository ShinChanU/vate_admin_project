import axios from "axios";
import { OrgProps } from "lib/zustand/organizationStore";
import { ActProps } from "lib/zustand/volunteerStore";

// 봉사 기관 전체 조회
export const getMemberOrg = async () => {
  try {
    const res = await axios.get("/members/organizations");
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 기관 세부 조회
export const getOrganization = async (id: number | any) => {
  try {
    const res = await axios.get(`/vol/organizations/${id}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 기관별 봉사활동 조회
export const getActivityApi = async (id: number) => {
  try {
    const res = await axios.get(`/vol/organizations/${id}/activities`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 활동 세션 전체 조회
export const getSessions = async (id: number) => {
  try {
    const res = await axios.get(`/vol/activities/${id}/sessions`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 날짜에 따른 봉사 활동 세션 조회
export const getSessionDate = async (id: number, date: string) => {
  try {
    const res = await axios.get(`/vol/activities/${id}/sessions?date=${date}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 신청자 정보 조회
export const getSessionApplicants = async (id: number) => {
  try {
    const res = await axios.get(`/vol/sessions/${id}/applicants`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 활동 등록
export const postActivityApi = async (data: ActProps) => {
  try {
    const res = await axios.post("/vol/activities", data);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 기관 등록
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

// 봉사 기관 수정
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

// 신청자 상태 수정
export const updateApplicantAuth = async (id: number, isAuthorized: string) => {
  try {
    const res = await axios.put(`/members/application/${id}/authorization`, {
      isAuthorized,
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 봉사 활동 수정
export const updateActivity = async (id: any, data: any) => {
  try {
    const res = await axios.put(`/vol/activities/${id}`, data);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 기관 삭제
export const deleteOrganization = async (id: any) => {
  try {
    const res = await axios.delete(`/vol/organizations/${id}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 활동 삭제
export const deleteActivity = async (id: any) => {
  try {
    const res = await axios.delete(`/vol/activities/${id}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};
