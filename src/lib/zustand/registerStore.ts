import { getOrganization, postActivityApi } from "lib/api/volunteerApi";
import create from "zustand";

export type TimeProps = {
  startTime: number | null;
  endTime: number | null;
  numOfRecruit: number | null;
  activityWeek: string;
  [key: string]: any;
};

export type ActProps = {
  [key: string]: null | string | number | TimeProps[] | any;
};

type DataEngKorProps = {
  [key: string]: string;
};

export interface RegisterStoreProps {
  newActivity: null | ActProps;
  newTimeList: null | TimeProps[];
  selectOrg: any;
  dataEngKor: DataEngKorProps;
  onAddActTime: (day: string) => void;
  onRemoveActTime: (idx: number) => void;
  initRegisterForm: () => void;
  onChange: (name: string, value: any) => void;
  onChangeDate: (key: string, flag: string, date: Date) => void;
  onChangeTimeList: (index: any, flag: any, value: any) => void;
  stringToDate: (key: string, name: string, status: string) => Date;
  dateToString: (date: Date) => string;
  postActivity: () => Promise<any[]>;
}

export const RegisterStore = create<RegisterStoreProps>((set, get) => ({
  newActivity: null,
  newTimeList: null,
  selectOrg: null,

  initRegisterForm: () => {
    set({
      newActivity: {
        activityName: null,
        activitySummary: null,
        activityContent: null,
        activityMethod: null,
        authorizationType: null,
        category: null,
        activityBegin: get().dateToString(new Date()),
        activityEnd: null,
        recruitBegin: get().dateToString(new Date()),
        recruitEnd: null,
        organizationId: null,
      },
      newTimeList: null,
      selectOrg: null,
    });
  },

  dataEngKor: {
    category: "봉사 분야",
    activityMethod: "활동 방법",
    authorizationType: "승인 구분",
    activityName: "봉사 활동명",
    activitySummary: "주요 활동",
    activityContent: "봉사 상세설명",
    activityBegin: "활동 기간 시작일",
    activityEnd: "활동 기간 종료일",
    recruitBegin: "모집 기간 시작일",
    recruitEnd: "모집 기간 종료일",
    organizationId: "활동 기관",
  },

  onChangeTimeList: (index, flag, value) => {
    let tmpTimeList;
    tmpTimeList = get().newTimeList;

    // time 데이터 수정
    if (flag === "end" && tmpTimeList && tmpTimeList[index]) {
      tmpTimeList[index].endTime = value;
    } else if (flag === "start" && tmpTimeList && tmpTimeList[index]) {
      tmpTimeList[index].startTime = value;
      if (tmpTimeList[index].endTime) {
        let enT = tmpTimeList[index].endTime;
        if (value && enT && value > enT) {
          tmpTimeList[index].endTime = value;
        }
      }
    }
    // numOfRecruit 데이터 수정
    if (flag === "num" && tmpTimeList && tmpTimeList[index]) {
      tmpTimeList[index].numOfRecruit = +value;
    }

    set({
      newTimeList: tmpTimeList,
    });
  },

  onAddActTime: (day) => {
    let tmpArr: TimeProps[] | null;
    tmpArr = get().newTimeList;

    if (tmpArr === null) tmpArr = [];
    tmpArr.push({
      startTime: 9,
      endTime: 9,
      numOfRecruit: null,
      activityWeek: day,
    });

    set({
      newTimeList: tmpArr,
    });
  },

  onRemoveActTime: (idx) => {
    let tmpArr;
    tmpArr = get().newTimeList;

    tmpArr?.splice(idx, 1);

    set({
      newTimeList: tmpArr,
    });
  },

  onChange: async (name, value) => {
    if (name.includes("Begin")) {
      let keyword = name.replace("Begin", "End");
      let endDate = get().newActivity?.[keyword];
      if (typeof endDate === "string") {
        if (
          Number(value.split("-").join("")) >
          Number(endDate.split("-").join(""))
        ) {
          get().onChange(keyword, value);
        }
      } else if (endDate === null) {
        get().onChange(keyword, value);
      }
    }

    if (name === "organizationId" && !!value) {
      let res = await getOrganization(value);
      if (res?.data.statusCode === 200) {
        set({ selectOrg: res?.data.result });
      }
      value = +value;
    }

    set({
      newActivity: {
        ...get().newActivity,
        [name]: value,
      },
    });
  },

  stringToDate: (key: string, name: string, status: string) => {
    let str;
    let act = get().newActivity;

    if (key === "start" && name === "act") str = act?.activityBegin;
    else if (key === "end" && name === "act") str = act?.activityEnd;
    else if (key === "start" && name === "rec") str = act?.recruitBegin;
    else if (key === "end" && name === "rec") str = act?.recruitEnd;

    if (!str) return new Date();
    var yyyyMMdd = String(str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(5, 7);
    var sDate = yyyyMMdd.substring(8, 10);
    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  },

  dateToString: (date: Date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  },

  onChangeDate: (key, flag, date) => {
    let resultKey;
    const stringDate = get().dateToString(date);
    if (key === "rec" && flag === "start") resultKey = "recruitBegin";
    else if (key === "rec" && flag === "end") resultKey = "recruitEnd";
    else if (key === "act" && flag === "start") resultKey = "activityBegin";
    else resultKey = "activityEnd";
    get().onChange(resultKey, stringDate);
  },

  postActivity: async () => {
    let error = [];
    let tmpTimeList = [];
    let timeList = get().newTimeList;
    let activity = get().newActivity;

    if (activity) {
      for (let key in activity) {
        if (activity?.[key] === null || activity?.[key] === "") {
          error.push(get().dataEngKor[key]);
        }
      }
    }

    if (timeList !== null) {
      for (let time of timeList) {
        let passFlag = true;
        for (let key in time) {
          if (key === "startTime" && time[key] === null) {
            time[key] = 0;
          } else if (time[key] === null || time[key] === "") {
            passFlag = false;
          }
        }
        if (passFlag) tmpTimeList.push(time);
      }
    }
    if (!tmpTimeList.length) {
      error.push("활동 요일");
    }

    if (error.length) {
      return [false, error];
    } else {
      if (activity) {
        activity.timeList = tmpTimeList;
        let res = await postActivityApi(activity);
        if (res?.data.statusCode === 200) {
          return [true, 1];
        } else {
          return [true, 0];
        }
      } else {
        return [true, 0];
      }
    }
  },
}));
