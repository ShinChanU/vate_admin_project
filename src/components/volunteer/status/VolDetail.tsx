import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import SessionForm from "./SessionForm";
import VolDetailInfo from "./VolDetailInfo";

interface Props {
  isOpen: boolean;
}

const BtnDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const OpenCloseBox = styled.div<Props>`
  border: 1px solid rgba(168, 168, 168, 0.7);
  margin-bottom: 10px;

  > header {
    font-weight: 650;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 10px;
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

const VolDetail = ({
  data,
  setActivityData,
  onClickDeleteActivity,
  setIsActModify,
}: any) => {
  const [isOpenActDetail, setIsOpenActDetail] = useState(false);
  const [isOpenVolDetail, setIsOpenVolDetail] = useState(false);
  const { id, organizationId } = data;

  return (
    <>
      <BtnDiv>
        <Button variant="secondary" onClick={() => setActivityData(null)}>
          목록으로
        </Button>
        <div>
          <Button
            variant="danger"
            onClick={() => onClickDeleteActivity(id, organizationId)}
          >
            봉사 삭제
          </Button>
          <Button
            style={{ marginLeft: "5px" }}
            onClick={() => setIsActModify(true)}
          >
            봉사 수정
          </Button>
        </div>
      </BtnDiv>
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
        <VolDetailInfo data={data} />
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
        <SessionForm actId={id} />
      </OpenCloseBox>
    </>
  );
};

export default VolDetail;
