import { RegisterStore } from "lib/zustand/registerStore";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FormProps } from "./Radio";

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  button {
    padding: 0px;
    width: 22px;
    line-height: 20px;
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
  const { timeList, onAddActTime, onRemoveActTime } = RegisterStore();

  return (
    <>
      <FlexBox>
        {contents?.map((e) => (
          <RadioElement key={e.id}>
            {e.kor}
            <Button onClick={() => onAddActTime(e.eng)}>&#43;</Button>
          </RadioElement>
        ))}
      </FlexBox>
      {timeList && <>활동시간</>}
      {timeList?.map((e: any, i) => (
        <FlexBox key={i}>
          {dayKor[e.activityWeek]}
          <div>시간 설정</div>
          <div>
            모집인원 <input />
          </div>
          <Button onClick={() => onRemoveActTime(i)}>-</Button>
        </FlexBox>
      ))}
    </>
  );
};

export default DynamicBox;
