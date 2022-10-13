import React, { useEffect } from "react";
import { SessionStore } from "lib/zustand/sessionStore";
import styled from "styled-components";
import ApplicantAuthBtn from "./ApplicantAuthBtn";

const Table = styled.table`
  border-top: 2px solid rgba(168, 168, 168, 0.7);
  border-bottom: 2px solid rgba(168, 168, 168, 0.7);
  width: 100%;
  border-collapse: collapse;
  tr {
    text-align: center;
    border-top: 2px solid rgba(168, 168, 168, 0.7);
  }

  tbody {
    border-top: 2px solid rgba(168, 168, 168, 0.7);
  }

  th,
  td {
    padding: 10px;
    @media screen and (max-width: 992px) {
      padding: 3px;
    }
  }
`;

const columns = [
  "성명",
  "생년월일",
  "1365포털 (소속센터)",
  "활동일자",
  "활동 시간",
  "총 시간",
  "연락처",
  "정보제공동의",
];

const Box = styled.div`
  padding: 10px;
  background: rgba(168, 168, 168, 0.7);
  font-weight: 650;

  > div {
    display: flex;
    @media screen and (max-width: 992px) {
      display: block;
    }
  }

  > header {
    margin-bottom: 10px;
  }

  select {
    margin-right: 20px;
    margin-left: 5px;
  }
`;

const SessionForm = ({ actId }: any) => {
  const {
    sessionsDates,
    sessionsTimes,
    getSessions,
    onChangeSearchDate,
    onChangeSearchTime,
    applicants,
    sessionId,
  } = SessionStore();

  useEffect(() => {
    getSessions(actId);
    onChangeSearchDate(actId, "default");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actId]);

  return (
    <div>
      <Box>
        <header>활동시간 맞춤조회</header>
        <div>
          <div>
            활동 날짜
            <select onChange={(e) => onChangeSearchDate(actId, e.target.value)}>
              <option value="default">기간을 선택해주세요.</option>
              {sessionsDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div>
            활동 시간
            <select onChange={(e) => onChangeSearchTime(+e.target.value)}>
              <option value={-1}>활동 시간을 선택해주세요.</option>
              {sessionsTimes.map((session) => (
                <option key={session.sessionId} value={session.sessionId}>
                  {session.startTime}:00~{session.endTime}:00
                </option>
              ))}
            </select>
          </div>
        </div>
      </Box>
      {!!applicants.length && (
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((e, i) => {
              const {
                name,
                birthday,
                idOf1365,
                activitySession,
                totalActivityTime,
                phoneNumber,
                privacyApproval,
                isAuthorized,
                applicationId,
              } = e;
              return (
                <tr key={applicationId}>
                  <td>{name}</td>
                  <td>{birthday}</td>
                  <td style={{ width: "100px" }}>{idOf1365}</td>
                  <td>{activitySession.activityDate}</td>
                  <td>
                    {activitySession.startTime}:00 ~ {activitySession.endTime}
                    :00
                  </td>
                  <td>{totalActivityTime}</td>
                  <td>{phoneNumber}</td>
                  <td>{privacyApproval || "없음"}</td>
                  <td>
                    <ApplicantAuthBtn
                      sessionId={sessionId}
                      id={applicationId}
                      authorization={isAuthorized}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {!applicants.length && (
        <div style={{ margin: "20px", textAlign: "center" }}>
          조회된 신청자가 없습니다.
        </div>
      )}
    </div>
  );
};

export default SessionForm;
