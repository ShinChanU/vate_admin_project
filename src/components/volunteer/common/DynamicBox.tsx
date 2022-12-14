import React from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import { FormProps } from "./Radio";
import TimeInput from "./TimeInput";
import { RegisterStore } from "lib/zustand/volunteerStore";

const FlexStyle = css`
  display: flex;
  align-items: center;
`;

const FlexBox = styled.div`
  ${FlexStyle};
  flex-wrap: wrap;
  justify-content: space-around;

  button {
    padding: 5px;
    /* width: 22px; */
    line-height: 15px;
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

const SubFlex = styled.div`
  ${FlexStyle}
`;

export const dayKor: any = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

const DynamicBox = ({ contents, timeList, flag }: FormProps) => {
  const { onAddActTime, onRemoveActTime, onChangeTimeList } = RegisterStore();

  return (
    <>
      <FlexBox style={{ marginBottom: "10px", justifyContent: "start" }}>
        {contents?.map((e) => (
          <RadioElement key={e.id}>
            {e.kor}
            <Button onClick={() => onAddActTime(e.eng)}>추가</Button>
          </RadioElement>
        ))}
      </FlexBox>
      {timeList?.map((e: any, i) => (
        <FlexBox style={{ marginBottom: "5px" }} key={i}>
          <div>
            <b>{dayKor[e.activityWeek]}</b>
          </div>
          <div>
            시작 시간
            <TimeInput time={e.startTime} index={i} flag="start" />
            시~종료 시간
            <TimeInput time={e.endTime} index={i} flag="end" />시
          </div>
          <SubFlex>
            모집 인원(명)
            <input
              style={{ width: "70px" }}
              placeholder="모집할 인원을 입력해주세요."
              type="text"
              value={e.numOfRecruit || 0}
              name="numOfRecruit"
              onChange={(e) => onChangeTimeList(i, "num", e.target.value)}
            />
            &nbsp;&nbsp;
            <Button variant="danger" onClick={() => onRemoveActTime(i)}>
              삭제
            </Button>
          </SubFlex>
        </FlexBox>
      ))}
    </>
  );
};

export default DynamicBox;
