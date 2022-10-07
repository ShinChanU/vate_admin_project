import React, { useState } from "react";
import styled, { css } from "styled-components";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import VolSystem from "components/VolSystem";

export interface StyledComProps {
  clickState?: boolean;
}

const Container = styled.div`
  margin-top: 100px;
  border-radius: 10px;
  border: rgba(50, 50, 93, 0.25) 2px solid;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  height: 80%;
  padding: 20px;
`;

const Ul = styled(Tabs)`
  margin-top: 15px;
  margin-bottom: 0px;
  padding: 0;
  color: black;
`;

const titleSeq = [
  {
    id: 0,
    title: "봉사 현황",
    des: "volStatus",
  },
  {
    id: 1,
    title: "봉사 등록",
    des: "volResister",
  },
];

const SystemPage = () => {
  const [nowStatus, setNowStatus] = useState<string | null>("volStatus");

  return (
    <Container>
      <div>VATE 등록 시스템</div>
      <section>
        <Ul
          id="controlled-tab-example"
          defaultActiveKey="volStatus"
          onSelect={(k) => setNowStatus(k)}
        >
          {titleSeq.map((e, i) => (
            <Tab key={e.id} eventKey={e.des} title={e.title}></Tab>
          ))}
        </Ul>
        <VolSystem status={nowStatus} />
      </section>
    </Container>
  );
};

export default SystemPage;
