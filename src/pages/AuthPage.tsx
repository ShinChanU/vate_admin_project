import LoginForm from "components/Auth/LoginForm";
import React from "react";
import SignUpForm from "components/Auth/SignUpForm";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px 50px;
  margin-bottom: 70px;
  border: black 1px solid;
  border-radius: 10px;
`;

const Header = styled.h2`
  text-align: center;
`;

const AuthPage = () => {
  return (
    <Container>
      <Header>VATE 등록 시스템</Header>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="signUp" element={<SignUpForm />}></Route>
      </Routes>
    </Container>
  );
};

export default AuthPage;
