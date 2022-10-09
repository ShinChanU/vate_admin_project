import { RegisterStore } from "lib/zustand/registerStore";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FormProps } from "./Radio";
import TimeInput from "./TimeInput";

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  button {
    padding: 0px;
    width: 22px;
    line-height: 20px;
  }

  @media screen and (max-width: 1023px) {
    display: block;
  }
`;

const RadioElement = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const dayKor: any = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

const DynamicBox = ({ contents }: FormProps) => {
  const { timeList, onAddActTime, onRemoveActTime, onChangeTimeList } =
    RegisterStore();

  return (
    <>
      <FlexBox style={{ marginBottom: "10px", justifyContent: "start" }}>
        {contents?.map((e) => (
          <RadioElement key={e.id}>
            {e.kor}
            <Button onClick={() => onAddActTime(e.eng)}>&#43;</Button>
          </RadioElement>
        ))}
      </FlexBox>
      {timeList?.map((e: any, i) => (
        <FlexBox key={i}>
          <div>
            <b>{dayKor[e.activityWeek]}</b>
          </div>
          <div>
            시작 시간
            <TimeInput time={e.startTime} index={i} flag="start" />
            시~종료 시간
            <TimeInput time={e.endTime} index={i} flag="end" />시
          </div>
          <div>
            모집 인원(명){" "}
            <input
              style={{ width: "70px" }}
              placeholder="모집할 인원을 입력해주세요."
              type="text"
              value={e.numOfRecruit || 0}
              name="numOfRecruit"
              onChange={(e) => onChangeTimeList(i, "num", e.target.value)}
            />
            &nbsp;&nbsp;<Button onClick={() => onRemoveActTime(i)}>-</Button>
          </div>
        </FlexBox>
      ))}
    </>
  );
};

export default DynamicBox;
