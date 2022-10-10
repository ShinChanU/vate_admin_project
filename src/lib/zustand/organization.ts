import create from "zustand";
import * as VolAPI from "lib/api/volunteerApi";

type CoordinateProps = {
  longitude?: number;
  latitude?: number;
  [key: string]: any;
};

type AddressProps = {
  detailAddress?: string;
  zipcode?: string;
  coordinate?: CoordinateProps;
  [key: string]: any;
};

export type OrgProps = {
  id?: number;
  name?: string;
  manager?: string;
  contact?: string;
  address?: AddressProps;
  [key: string]: any;
};

interface OrganizationStoreProps {
  organizations: OrgProps[];
  verifyOrgForm: (data: OrgProps) => boolean;
  postOrganization: (data: OrgProps) => Promise<boolean>;
  getOrganizations: () => void;
}

export const OrganizationStore = create<OrganizationStoreProps>((set, get) => ({
  organizations: [],

  verifyOrgForm: (data: OrgProps) => {
    for (let key in data) {
      if (key === "id") continue;
      if (!data[key]) {
        return false;
      }
      if (key === "address") {
        for (let key2 in data.address) {
          if (!data.address[key2]) {
            return false;
          }
          if (key2 === "coordinate") {
            for (let key3 in data.address.coordinate) {
              if (!data.address.coordinate[key3]) {
                return false;
              }
            }
          }
        }
      }
    }

    return true;
  },

  postOrganization: async (data) => {
    console.log(data);
    if (!get().verifyOrgForm(data)) {
      alert("항목을 모두 채워주세요 !");
      return false;
    }
    if (data.id) {
      // put
      const res = await VolAPI.updateOrganization(data);
      if (res?.data.statusCode === 200) {
        get().getOrganizations();
        alert("수정되었습니다.");
      }
    } else {
      // post
      const res = await VolAPI.postOrganization(data);
      if (res?.data.statusCode === 200) {
        get().getOrganizations();
        alert("생성되었습니다.");
      }
    }
    return true;
  },

  getOrganizations: async () => {
    const res = await VolAPI.getMemberOrg();
    if (res?.data.statusCode === 200) {
      set({ organizations: res.data.result });
    }
  },
}));
