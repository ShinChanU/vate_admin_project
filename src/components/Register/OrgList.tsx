import React from "react";
import { RegisterStore } from "lib/zustand/registerStore";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { OrganizationStore } from "lib/zustand/organization";
import { deleteOrganization } from "lib/api/volunteerApi";

const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  > div {
    width: 100%;
    > div {
      border-bottom: 1px solid black;
      padding: 10px 0px;
      margin-bottom: 5px;
    }
  }
  /* margin: auto; */
  /* align-items: center; */
`;

const Span = styled.div`
  width: 80px;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const OrgList = ({ setModView, setModDataId }: any) => {
  const { organizations, getOrganizations } = OrganizationStore();

  console.log(organizations);

  const onClickModBtn = (id: any) => {
    setModView(true);
    setModDataId(id);
  };

  const onClickDelBtn = async (id: any) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      let res = await deleteOrganization(id);
      if (res?.data.statusCode === 200) {
        alert("삭제되었습니다.");
        setModView(false);
        getOrganizations();
      }
    }
  };

  return (
    <Container>
      {!!organizations.length && (
        <div>
          {organizations.map((e) => (
            <div key={e.id}>
              <FlexDiv>
                <Span>
                  <b>기관명</b>
                </Span>
                <span>{e.name}</span>
              </FlexDiv>
              <FlexDiv>
                <Span>
                  <b>기관 주소</b>
                </Span>
                <span>{e.address?.detailAddress}</span>
              </FlexDiv>
              <FlexDiv>
                <Span>
                  <b>담당자</b>
                </Span>
                <span>{e.manager}</span>
              </FlexDiv>
              <FlexDiv>
                <Span>
                  <b>기관 번호</b>
                </Span>
                <span>{e.contact}</span>
              </FlexDiv>
              <BtnFlex>
                <Button variant="primary" onClick={() => onClickModBtn(e.id)}>
                  수정
                </Button>
                <Button variant="danger" onClick={() => onClickDelBtn(e.id)}>
                  삭제
                </Button>
              </BtnFlex>
            </div>
          ))}
        </div>
      )}
      {/* {organizations.length !== 0 && (
        <div>조회되는 활동 기관이 없습니다. 추가해주세요</div>
      )} */}
    </Container>
  );
};

export default OrgList;
