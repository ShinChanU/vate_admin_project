import { RegisterStore } from "lib/zustand/volunteerStore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import InputForm from "../common/InputForm";
import OrganizationsAdminForm from "./OrganizationsAdminForm";

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

const RegisterForm = ({ setNowStatus, organizations }: any) => {
  const { newTimeList, initRegisterForm, postActivity, newActivity } =
    RegisterStore();
  const [page, setPage] = useState("form");

  const onClick = async () => {
    let res = await postActivity();
    if (res[0]) {
      if (res[1]) {
        // post 성공
        alert("등록에 성공하였습니다 !");
        initRegisterForm();
        setNowStatus("volStatus");
      } else {
        // post 실패
        alert("등록에 실패하였습니다. 다시 시도 해주세요.");
        initRegisterForm();
      }
    } else {
      // post 실패
      let str = res[1];
      str = str.join(", ");
      alert(`항목들을 모두 입력해주세요. \n\n ***입력 누락 항목 : ${str}`);
    }
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
          <InputForm
            setPage={setPage}
            organizations={organizations}
            activity={newActivity}
            timeList={newTimeList}
            flag="new"
          />
        </>
      )}
      {page === "org" && <OrganizationsAdminForm setPage={setPage} />}
    </FlexBox>
  );
};

export default RegisterForm;
