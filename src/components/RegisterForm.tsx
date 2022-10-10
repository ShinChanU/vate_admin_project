import { RegisterStore } from "lib/zustand/registerStore";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import OrganizationsAdminForm from "./Register/OrganizationsAdminForm";
import RegisterDetail from "./RegisterDetail";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > header {
    display: flex;
    justify-content: end;
  }

  > header button {
    width: 80px;
    border: 1px solid black;
    border-radius: 5px;
    margin-left: 10px;
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
  const { initRegisterForm, postActivity, activity } = RegisterStore();
  const [page, setPage] = useState("form");

  console.log(activity);

  // useEffect(() => {
  //   initRegisterForm();
  // }, [initRegisterForm]);

  const onClick = () => {
    let res = postActivity();
    if (res[0]) {
      // post 성공
      // initRegisterForm();
    } else {
      // post 실패
      console.log(res[1]);
      let str = res[1];
      str = str.join(", ");
      alert(`항목들을 모두 입력해주세요. \n\n ***입력 누락 항목 : ${str}`);
    }
    console.log(res);
  };

  return (
    <FlexBox>
      {page === "form" && (
        <>
          <header>
            <Button variant="danger" onClick={initRegisterForm}>
              초기화
            </Button>
            <Button onClick={onClick}>등록</Button>
          </header>
          <RegisterDetail setPage={setPage} activity={activity} />
        </>
      )}
      {page === "org" && <OrganizationsAdminForm setPage={setPage} />}
    </FlexBox>
  );
};

export default RegisterForm;
