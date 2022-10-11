import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import registerData from "../../lib/json/volRegisterFormData.json";
import VolDetailValue from "./VolDetailValue";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import SessionForm from "./SessionForm";

interface Props {
  isOpen: boolean;
}

const OpenCloseBox = styled.div<Props>`
  border: 1px solid rgba(168, 168, 168, 0.7);
  margin-bottom: 10px;

  > header {
    font-weight: 650;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    background: rgba(168, 168, 168, 0.3);
    border-bottom: 1px solid rgba(168, 168, 168, 0.3);
  }

  > div {
    max-height: 600px;
    overflow: hidden;
    transition: 0.5s ease max-height;
    overflow: auto;
    /* border: 1px solid rgba(91, 91, 192, 0.25); */
  }

  ${(props) =>
    !props.isOpen &&
    css`
      > div {
        max-height: 0px;
        border: none;
      }
    `}
`;

const VolDetail = ({ volData }: any) => {
  const [isOpenActDetail, setIsOpenActDetail] = useState(false);
  const [isOpenVolDetail, setIsOpenVolDetail] = useState(false);

  const searchKorLan = (_data: any, _id: string) => {
    let value;
    _data.contents?.forEach((e: any) => {
      if (e.eng === volData[_id]) {
        value = e.kor;
        return;
      }
    });
    return value;
  };

  return (
    <>
      <OpenCloseBox isOpen={isOpenActDetail}>
        <header>
          봉사 상세 정보
          <Button
            variant="dark"
            onClick={() => setIsOpenActDetail(!isOpenActDetail)}
          >
            {isOpenActDetail ? "접기" : "펼치기"}
            {!isOpenActDetail ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}
          </Button>
        </header>
        <div>
          {registerData.map((data) => {
            const { id, title } = data;
            let value = volData[id];
            if (
              id === "category" ||
              id === "activityMethod" ||
              id === "authorizationType"
            ) {
              // kor 단어 반환
              value = searchKorLan(data, id);
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="text"
                  value={value}
                />
              );
            } else if (id === "activityDay") {
              // 시간 배열 반복
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="array"
                  value={volData.activityDayofWeeks}
                />
              );
            } else if (id === "organization") {
              // organizationId로 api 요청
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="org"
                  value={volData.organizationId}
                />
              );
            } else if (id === "activityContent") {
              // textarea
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="textarea"
                  value={value}
                />
              );
            } else if (id === "recruitDate") {
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="date"
                  value={volData.activityRecruitPeriod}
                />
              );
            } else if (id === "activityDate") {
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="date"
                  value={volData.activityPeriod}
                />
              );
            } else {
              return (
                <VolDetailValue
                  key={id}
                  title={title}
                  type="text"
                  value={value}
                />
              );
            }
          })}
        </div>
      </OpenCloseBox>
      <OpenCloseBox isOpen={isOpenVolDetail}>
        <header>
          신청자 정보
          <Button
            variant="dark"
            onClick={() => setIsOpenVolDetail(!isOpenVolDetail)}
          >
            {isOpenVolDetail ? "접기" : "펼치기"}
            {!isOpenVolDetail ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}
          </Button>
        </header>
        <SessionForm actId={volData.id} />
      </OpenCloseBox>
    </>
  );
};

export default VolDetail;
