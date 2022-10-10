import React from "react";
import { OrgProps } from "lib/zustand/registerStore";

type OrganizationsProps = {
  organizations: OrgProps[];
  setPage: any;
};

const OrganizationForm = ({ organizations, setPage }: OrganizationsProps) => {
  //  봉사기관 받아와서 select박스로 뿌려주고 추가 가능

  console.log(organizations);
  return (
    <div>
      <select>
        <option>봉사기관</option>
      </select>
      <button onClick={() => setPage("org")}>봉사기관 추가</button>
      <div>
        기간주소 <input />
      </div>
      <div>
        담당자 주소 <input />
      </div>
      <div>
        기관 주소 <input />
      </div>
    </div>
  );
};

export default OrganizationForm;
