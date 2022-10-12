import * as VolAPI from "lib/api/volunteerApi";
import create from "zustand";
import { ActProps } from "./registerStore";

export interface ActivityStoreProps {
  activities: ActProps[];
  getActivities: (orgId: number) => Promise<any>;
}

export const ActivityStore = create<ActivityStoreProps>((set, get) => ({
  activities: [],

  getActivities: async (orgId) => {
    const res = await VolAPI.getActivityApi(orgId);
    if (res?.data.statusCode === 200) {
      let tmp = [];
      for (let data of res?.data.result) {
        if (!data.isDeleted) tmp.push(data);
      }
      set({ activities: tmp });
    }
  },

  initActivities: () => {
    set({ activities: [] });
  },
}));
