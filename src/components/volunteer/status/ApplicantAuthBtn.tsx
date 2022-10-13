import { updateApplicantAuth } from "lib/api/volunteerApi";
import { SessionStore } from "lib/zustand/sessionStore";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

type ApplicantAuthBtnProps = {
  authorization: string;
  id: number;
  sessionId: number;
};

const FlexBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ApplicantAuthBtn = ({
  authorization,
  id,
  sessionId,
}: ApplicantAuthBtnProps) => {
  const { onChangeSearchTime } = SessionStore();

  const onClick = async (str: string, msg: string) => {
    if (window.confirm(`해당 신청자를 ${msg} 하시겠습니까?`)) {
      let res = await updateApplicantAuth(id, str);
      if (res?.data.statusCode === 200) {
        alert("처리되었습니다.");
        onChangeSearchTime(sessionId);
      }
    }
  };

  return (
    <FlexBtn>
      {authorization === "APPROVAL" && (
        <>
          <div>승인 됨</div>
          <Button
            onClick={() => onClick("WAITING", "승인 취소")}
            variant="warning"
            size="sm"
          >
            승인 취소
          </Button>
        </>
      )}
      {authorization === "WAITING" && (
        <>
          <Button onClick={() => onClick("APPROVAL", "승인")} size="sm">
            승인
          </Button>
          <Button
            onClick={() => onClick("DISAPPROVAL", "승인 거부")}
            variant="danger"
            size="sm"
          >
            거부
          </Button>
        </>
      )}
      {authorization === "DISAPPROVAL" && <>승인 거절됨</>}
      {authorization === "COMPLETE" && <>활동 완료</>}
      {authorization === "CANCELED" && <>취소됨</>}
    </FlexBtn>
  );
};

export default ApplicantAuthBtn;
