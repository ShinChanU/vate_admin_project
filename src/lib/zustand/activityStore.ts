import * as VolAPI from "lib/api/volunteerApi";
import create from "zustand";
import { ActProps } from "./registerStore";

export interface ActivityStoreProps {
  activities: null | ActProps[];
  getActivities: (orgId: number) => Promise<any>;
}

export const ActivityStore = create<ActivityStoreProps>((set, get) => ({
  activities: null,

  getActivities: async (orgId) => {
    const res = await VolAPI.getActivityApi(orgId);
    if (res?.data.statusCode === 200) {
      set({ activities: res?.data.result });
    }
  },

  initActivities: () => {
    set({ activities: null });
  },
}));
