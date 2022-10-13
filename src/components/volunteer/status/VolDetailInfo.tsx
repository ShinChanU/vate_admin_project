import React from "react";
import registerData from "../../../lib/json/volRegisterFormData.json";
import VolDetailValue from "./VolDetailValue";

const VolDetailInfo = ({ data, flag, onChange, modActData }: any) => {
  const {
    organizationId,
    activityDayofWeeks,
    activityRecruitPeriod,
    activityPeriod,
  } = data;

  return (
    <div>
      {registerData.map((_data) => {
        const { id, title, type, contents } = _data;
        let value = data[id];
        if (id === "activityDay") {
          // 시간 배열 반복
          return (
            <VolDetailValue
              key={id}
              title={title}
              type="array"
              value={activityDayofWeeks}
            />
          );
        } else if (id === "organization") {
          // organizationId로 api 요청
          return (
            <VolDetailValue
              key={id}
              title={title}
              type="org"
              value={organizationId}
            />
          );
        } else if (id === "recruitDate") {
          return (
            <VolDetailValue
              key={id}
              title={title}
              type="date"
              value={activityRecruitPeriod}
            />
          );
        } else if (id === "activityDate") {
          return (
            <VolDetailValue
              key={id}
              title={title}
              type="date"
              value={activityPeriod}
            />
          );
        } else {
          return (
            <VolDetailValue
              flag={flag}
              key={id}
              title={title}
              type={type}
              value={modActData?.[id] || value}
              onChange={onChange}
              name={id}
              contents={contents}
            />
          );
        }
      })}
    </div>
  );
};

export default VolDetailInfo;
