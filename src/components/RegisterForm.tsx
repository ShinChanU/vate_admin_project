import { RegisterStore } from "lib/zustand/registerStore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OrganizationsAdminForm from "./Register/OrganizationsAdminForm";
import RegisterDetail from "./RegisterDetail";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > button {
    width: 70px;
    border: 1px solid black;
    border-radius: 5px;
    margin-left: auto;
  }

  > div {
    flex: 1;
    margin-top: 10px;
    border: 1px solid rgba(50, 50, 93, 0.25);
    border-radius: 5px;
    padding: 10px;
  }
`;

const RegisterForm = () => {
  const { initRegisterForm } = RegisterStore();
  const [page, setPage] = useState("form");

  useEffect(() => {
    initRegisterForm();
  }, [initRegisterForm]);

  return (
    <FlexBox>
      {page === "form" && (
        <>
          <button>등록</button>
          <RegisterDetail setPage={setPage} />
        </>
      )}
      {page === "org" && <OrganizationsAdminForm setPage={setPage} />}
    </FlexBox>
  );
};

export default RegisterForm;
