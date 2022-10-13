import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import OrgList from "./OrgList";
import RegisterOrgForm from "./RegisterOrgForm";

interface Props {
  cnt: number;
}

const Container = styled.div<Props>`
  display: grid;
  min-height: 500px;
  border: 1px solid black;
  transition: 1s linear all;
  ${(props) =>
    props.cnt === 1 &&
    css`
      display: flex;
      justify-content: center;
      > div {
        width: 500px;
      }
      @media screen and (max-width: 767px) {
        > div {
          width: auto;
        }
      }
      /* grid-template-columns: 0.5fr; */
    `}
  ${(props) =>
    props.cnt === 2 &&
    css`
      grid-template-columns: 1fr 1fr;
    `}
  @media screen and (max-width: 767px) {
    display: block;
  }

  .list {
    > div {
      /* flex: 1; */
      height: 600px;
      overflow: auto;
      @media screen and (max-width: 1023px) {
        height: auto;
      }
    }
  }

  .item {
    border: 1px solid rgba(50, 50, 93, 0.75);
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    height: 100%;
    margin: auto;

    transition: all 0.5s linear;
    display: flex;
    flex-direction: column;

    > header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;

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

const OrganizationsAdminForm = ({ setPage }: any) => {
  const [listView, setListView] = useState(false);
  const [modView, setModView] = useState(false);
  const [modDataId, setModDataId] = useState(null);
  const [cnt, setCnt] = useState(1);

  useEffect(() => {
    if (listView) {
      setCnt(2);
    } else {
      setCnt(1);
    }
  }, [listView]);

  const onSetListView = () => {
    setListView(!listView);
    if (listView) {
      setModView(false);
    }
  };

  return (
    <Container cnt={cnt}>
      <SubGrid>
        {/* 활동 기관 등록 폼 */}
        <div className="item">
          <header>
            활동 기관 등록 <span onClick={() => setPage("form")}>X</span>
          </header>
          <RegisterOrgForm onSetListView={onSetListView} />
        </div>
        {/* 활동 기관 수정 폼 */}
        {modView && (
          <div className="item">
            <header>
              활동 기관 수정 <span onClick={() => setModView(false)}>X</span>
            </header>
            <RegisterOrgForm modDataId={modDataId} />
          </div>
        )}
      </SubGrid>
      {/* 활동 기관 목록 폼 */}
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
