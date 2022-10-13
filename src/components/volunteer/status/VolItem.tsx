import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const Item = styled.div`
  border-bottom: 1px solid rgb(91, 91, 192);
  padding-bottom: 10px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > div {
    display: inline-block;
    font-size: 15px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    height: 30px;
    padding: 3px;
    margin: 3px;
    font-size: 15px;
    width: 95px;
  }
`;

const VolItem = ({
  data,
  setActivityData,
  onClickDeleteActivity,
  setIsActModify,
}: any) => {
  const { id, organization, activitySummary, organizationId } = data;

  return (
    <Item>
      <Contents>
        <div>봉사번호 {id}번</div>
        <div>
          [{organization}] {activitySummary}
        </div>
        <div>
          [모집기관] {organization}
          {/* 활동요일 {activityDayOfweeks} */}
          [주요활동] {activitySummary}
        </div>
      </Contents>
      <Buttons>
        <Button onClick={() => setActivityData(data)}>상세 및 승인</Button>
        <Button
          variant="secondary"
          onClick={() => {
            setActivityData(data);
            setIsActModify(true);
          }}
        >
          봉사 수정
        </Button>
        <Button
          variant="danger"
          onClick={() => onClickDeleteActivity(id, organizationId)}
        >
          봉사 삭제
        </Button>
      </Buttons>
    </Item>
  );
};

export default VolItem;
