import React from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import StatusForm from "./StatusForm";

type VolStatusProps = {
  status: string | null;
};

const Container = styled.div`
  height: 100%;
  border-radius: 0px 0px 5px 5px;
  border: rgba(50, 50, 93, 0.25) 1px solid;
  border-top: none;
  padding: 20px;
  /* outline: 1px solid black; */
`;

const VolSystem = ({ status }: VolStatusProps) => {
  return (
    <Container>
      {status === "volStatus" && <StatusForm />}
      {status === "volRegister" && <RegisterForm />}
    </Container>
  );
};

export default VolSystem;
