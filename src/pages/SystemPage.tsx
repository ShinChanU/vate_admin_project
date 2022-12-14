import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AdminForm from "components/volunteer/AdminForm";

export interface StyledComProps {
  clickState?: boolean;
}

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  border-radius: 10px;
  border: rgba(50, 50, 93, 0.25) 2px solid;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  /* height: 650px; */
  padding: 20px 40px;
`;

const Section = styled.section`
  height: 80%;
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
    des: "volRegister",
  },
];

const SystemPage = () => {
  const [nowStatus, setNowStatus] = useState<string | null>("volStatus");

  return (
    <Container>
      <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "550" }}>
        VATE 등록 시스템
      </div>
      <Section>
        <Ul
          id="controlled-tab-example"
          defaultActiveKey="volStatus"
          onSelect={(k) => setNowStatus(k)}
        >
          {titleSeq.map((e, i) => (
            <Tab key={e.id} eventKey={e.des} title={e.title}></Tab>
          ))}
        </Ul>
        <AdminForm status={nowStatus} setNowStatus={setNowStatus} />
      </Section>
    </Container>
  );
};

export default SystemPage;
