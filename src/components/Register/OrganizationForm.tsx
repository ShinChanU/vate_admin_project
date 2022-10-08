import React from "react";

const OrganizationForm = () => {
  //  봉사기관 받아와서 select박스로 뿌려주고 추가 가능
  return (
    <div>
      <select>
        <option>봉사기관</option>
      </select>
      <button>+</button>
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
