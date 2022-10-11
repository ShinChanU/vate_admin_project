import create from "zustand";
import * as VolAPI from "../api/volunteerApi";

type ActivitySessionProps = {
  activityDate: string;
  startTime: number;
  endTime: number;
};

type SessionProps = {
  activityDate: string;
  endTime: number;
  numOfApplicant: number;
  numOfRecruit: number;
  sessionId: number;
  sessionStatus: string;
  startTime: number;
};

type ApplicantProps = {
  applicationId: number;
  name: string;
  birthday: string;
  idOf1365: string;
  centerName: string;
  activitySession: ActivitySessionProps;
  totalActivityTime: number;
  phoneNumber: string;
  privacyApproval: string;
  isAuthorized: string;
};

export interface SessionStoreProps {
  sessionsDates: [] | string[];
  sessionsTimes: [] | SessionProps[];
  sessionId: number;
  applicants: [] | ApplicantProps[];
  onChangeSearchDate: (id: number, value: string) => void;
  onChangeSearchTime: (id: number) => void;
  getSessions: (id: number) => void;
}

export const SessionStore = create<SessionStoreProps>((set, get) => ({
  sessionsDates: [],
  sessionsTimes: [],
  sessionId: -1,
  applicants: [],

  onChangeSearchDate: async (id: number, value: string) => {
    if (value === "default") {
      set({ sessionsTimes: [], applicants: [] });
      return;
    }
    const res = await VolAPI.getSessionDate(id, value);
    if (res?.data.statusCode === 200) {
      set({ sessionsTimes: res?.data.result });
    }
  },

  onChangeSearchTime: async (id: number) => {
    set({ sessionId: id });
    if (id === -1) {
      set({ applicants: [] });
      return;
    }
    const res = await VolAPI.getSessionApplicants(id);
    console.log(res);
    if (res?.data.statusCode === 200) {
      set({ applicants: res?.data.result });
    }
  },

  getSessions: async (id) => {
    const res = await VolAPI.getSessions(id);
    console.log(res);
    if (res?.data.statusCode === 200) {
      // 더미 데이터로 테스트
      let tmpArr: string[] = [];
      res.data.result.forEach((e: any) => {
        if (!tmpArr.includes(e.activityDate)) {
          tmpArr.push(e.activityDate);
        }
      });
      set({ sessionsDates: tmpArr });
    }
  },
}));
