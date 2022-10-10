import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import OrgList from "./OrgList";
import RegisterOrgForm from "./RegisterOrgForm";

const Container = styled.div`
  display: grid;
  min-height: 500px;
  border: 1px solid black;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 767px) {
    display: block;
  }

  .list {
    > div {
      height: 500px;
      overflow: auto;
    }
  }

  .item {
    border: 1px solid rgba(50, 50, 93, 0.75);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    transition: all 0.5s linear;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > header {
      display: flex;
      justify-content: space-between;

      > span {
        width: 24px;
        text-align: end;
        cursor: pointer;
      }
    }
  }
`;

const SubGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div {
    height: 50%;
  }
`;

const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrganizationsAdminForm = ({ setPage }: any) => {
  const [listView, setListView] = useState(false);
  const [modView, setModView] = useState(false);
  const [modDataId, setModDataId] = useState(null);

  // setPage("form") 으로 종료
  // 현재 데이터 날리기

  const onSetListView = () => {
    setListView(!listView);
    if (listView) {
      setModView(false);
    }
  };

  return (
    <Container>
      <SubGrid>
        <div className="item">
          <header>
            활동 기관 등록 <span onClick={() => setPage("form")}>X</span>
          </header>
          <RegisterOrgForm />
          <BtnFlex>
            <Button variant="dark" onClick={onSetListView}>
              목록
            </Button>
            <Button variant="primary" onClick={onSetListView}>
              등록
            </Button>
          </BtnFlex>
        </div>
        {modView && (
          <div className="item">
            <header>
              활동 기관 수정 <span onClick={() => setModView(false)}>X</span>
            </header>
            <RegisterOrgForm modDataId={modDataId} />
            <Button variant="primary">수정</Button>
          </div>
        )}
      </SubGrid>
      {listView && (
        <div className="item list">
          <header>
            활동 기관 목록 <span onClick={onSetListView}>X</span>
          </header>
          <OrgList setModView={setModView} setModDataId={setModDataId} />
        </div>
      )}
    </Container>
  );
};

export default OrganizationsAdminForm;
