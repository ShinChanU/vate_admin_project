import { RegisterStore } from "lib/zustand/registerStore";
import React, { useEffect, useState } from "react";

type TimeInputProps = {
  time: number | null;
  index: number;
  flag: string;
};

const TimeInput = ({ time, index, flag }: TimeInputProps) => {
  const { timeList, onChangeTimeList } = RegisterStore();
  const [timeArr, setTimeArr] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]);

  useEffect(() => {
    if (flag === "end" && timeList) {
      let tmpStartT = timeList[index].startTime;
      if (tmpStartT !== null) {
        let tmpArr = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23,
        ].filter((e) => e >= (tmpStartT || 0));
        setTimeArr(tmpArr);
      }
    }
  }, [timeList?.[index].startTime]);

  return (
    <select
      value={time || 0}
      onChange={(e) => onChangeTimeList(index, flag, +e.target.value)}
    >
      {timeArr.map((e) => {
        return (
          <option key={e} value={e}>
            {e}
          </option>
        );
      })}
    </select>
  );
};

export default TimeInput;
