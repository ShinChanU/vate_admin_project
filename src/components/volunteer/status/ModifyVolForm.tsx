import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import VolDetailInfo from "./VolDetailInfo";

const Header = styled.header`
  display: flex;
  margin: 0px 30px;
`;

const Footer = styled.footer`
  display: flex;
  margin: 0px 30px;
  justify-content: end;
`;

const ModifyVolForm = ({
  setIsActModify,
  setActivityData,
  modActData,
  activityData,
  onChangeModAct,
  onClickUpdateActivity,
}: any) => {
  return (
    <>
      <Header>
        <Button
          onClick={() => {
            setIsActModify(false);
            setActivityData(null);
          }}
          variant="secondary"
        >
          목록으로
        </Button>
      </Header>
      <VolDetailInfo
        data={activityData}
        modActData={modActData}
        flag="mod"
        onChange={onChangeModAct}
      />
      <Footer>
        <Button onClick={onClickUpdateActivity}>수정 완료</Button>
      </Footer>
    </>
  );
};

export default ModifyVolForm;
