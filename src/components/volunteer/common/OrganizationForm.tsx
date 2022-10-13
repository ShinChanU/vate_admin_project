import { OrgProps } from "lib/zustand/organizationStore";
import React from "react";
import { RegisterStore } from "lib/zustand/volunteerStore";
import styled from "styled-components";
import { Button } from "react-bootstrap";

type OrganizationsProps = {
  organizations: OrgProps[];
  setPage: any;
};

const Flex = styled.div`
  display: flex;

  > button {
    margin-left: 10px;
  }
`;

const Label = styled.label`
  width: 80px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 300px;
  @media screen and (max-width: 767px) {
    width: auto;
  }
`;

const OrganizationForm = ({ organizations, setPage }: OrganizationsProps) => {
  //  봉사기관 받아와서 select박스로 뿌려주고 추가 가능
  const { onChange, selectOrg } = RegisterStore();

  return (
    <div>
      <Flex>
        <select
          name="organizationId"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        >
          <option value="">선택해주세요.</option>
          {organizations.map((e) => {
            return (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <Button onClick={() => setPage("org")}>봉사기관 추가</Button>
      </Flex>
      <div>
        <Label>기관 주소</Label>
        <Input disabled value={selectOrg?.address?.detailAddress || ""} />
      </div>
      <div>
        <Label>담당자</Label>
        <Input disabled value={selectOrg?.manager || ""} />
      </div>
      <div>
        <Label>기관 번호</Label>
        <Input disabled value={selectOrg?.contact || ""} />
      </div>
    </div>
  );
};

export default OrganizationForm;
