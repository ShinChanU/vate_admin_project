import React from "react";
import styled from "styled-components";

type VolStatusProps = {
  status: string | null;
};

const Container = styled.div`
  border-radius: 0px 0px 5px 5px;
  border: rgba(50, 50, 93, 0.25) 1px solid;
  border-top: none;
  /* outline: 1px solid black; */
`;

const VolSystem = ({ status }: VolStatusProps) => {
  return <Container>{status}</Container>;
};

export default VolSystem;
