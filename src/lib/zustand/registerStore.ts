import create from "zustand";

type TimeProps = {
  startTime: number | null;
  endTime: number | null;
  numOfRecruit: number | null;
  activityWeek: string;
};

type ActProps = {
  [key: string]: null | string | number | TimeProps[];
};

interface RegisterStoreProps {
  activity: null | ActProps;
  timeList: null | TimeProps[];
  onChangeTimeList: (index: number, flag: string, value: any) => void;
  onAddActTime: (day: string) => void;
  onRemoveActTime: (idx: number) => void;
  initRegisterForm: () => void;
  onChange: (name: string, value: any) => void;
  onChangeDate: (key: string, flag: string, date: Date) => void;
  stringToDate: (key: string, name: string) => Date;
  dateToString: (date: Date) => string;
}

export const RegisterStore = create<RegisterStoreProps>((set, get) => ({
  activity: null,

  timeList: null,

  onChangeTimeList: (index, flag, value) => {
    console.log(index, flag, value);
    let tmpTimeList = get().timeList;
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
      timeList: tmpTimeList,
    });
  },

  onAddActTime: (day) => {
    let tmpArr = get().timeList;
    if (tmpArr === null) tmpArr = [];
    tmpArr.push({
      startTime: null,
      endTime: null,
      numOfRecruit: null,
      activityWeek: day,
    });
    set({
      timeList: tmpArr,
    });
  },

  onRemoveActTime: (idx) => {
    let tmpArr = get().timeList;
    tmpArr?.splice(idx, 1);
    set({
      timeList: tmpArr,
    });
  },

  initRegisterForm: () => {
    set({
      activity: {
        activityName: null,
        activitySummary: null,
        activityContent: null,
        activityMethod: null, // "" 일수도
        authorizationType: null, // "" 일수도
        category: null,
        activityBegin: null,
        activityEnd: null,
        recruitBegin: null,
        recruitEnd: null,
        organizationId: null,
      },
    });
  },

  onChange: (name, value) => {
    console.log(name, value);
    if (name.includes("Begin")) {
      let keyword = name.replace("Begin", "End");
      let endDate = get().activity?.[keyword];
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

    set({
      activity: {
        ...get().activity,
        [name]: value,
      },
    });
  },

  stringToDate: (key: string, name: string) => {
    let str;
    if (key === "start" && name === "act") str = get().activity?.activityBegin;
    else if (key === "end" && name === "act") str = get().activity?.activityEnd;
    else if (key === "start" && name === "rec")
      str = get().activity?.recruitBegin;
    else if (key === "end" && name === "rec") str = get().activity?.recruitEnd;
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
}));
