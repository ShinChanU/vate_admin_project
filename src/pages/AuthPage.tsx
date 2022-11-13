import LoginForm from "components/Auth/LoginForm";
import React, { useEffect } from "react";
import SignUpForm from "components/Auth/SignUpForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthStore } from "lib/zustand/authStore";

const StyleContainer = styled.div`
  padding: 50px 70px;
  margin-top: 100px;
  border: rgba(50, 50, 93, 0.25) 2px solid;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  @media screen and (max-width: 767px) {
    padding: 50px 20px;
  }
`;

const InputContainer = styled.div`
  width: 600px;
  margin: auto;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Header = styled.h2`
  text-align: center;
`;

const AuthPage = () => {
  const { user } = AuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(process.env.PUBLIC_URL + "/system");
    }
  }, [user, navigate]);

  return (
    <StyleContainer>
      <Header>VATE 등록 시스템</Header>
      <InputContainer>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="login" element={<LoginForm />}></Route>
          <Route path="signUp" element={<SignUpForm />}></Route>
        </Routes>
      </InputContainer>
    </StyleContainer>
  );
};

export default AuthPage;
