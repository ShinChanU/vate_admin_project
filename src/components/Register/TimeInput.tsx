import React, { useEffect, useState } from "react";
import { RegisterStore } from "lib/zustand/registerStore";

type TimeInputProps = {
  time: number | null;
  index: number;
  flag: string;
};

const TimeInput = ({ time, index, flag }: TimeInputProps) => {
  const { newTimeList, onChangeTimeList } = RegisterStore();
  const [timeArr, setTimeArr] = useState([
    9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  ]);

  useEffect(() => {
    if (flag === "end" && newTimeList) {
      let tmpStartT = newTimeList[index].startTime;
      if (tmpStartT !== null) {
        let tmpArr = [
          9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        ].filter((e) => e >= (tmpStartT || 0));
        setTimeArr(tmpArr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTimeList?.[index].startTime]);

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
