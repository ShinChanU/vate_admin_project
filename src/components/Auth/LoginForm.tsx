import React, { useEffect } from "react";
import { AuthStore } from "lib/zustand/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  form input {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    height: 40px;
  }

  button {
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    background: #dbe4ff;
    color: black;
    border: none;

    :hover {
      background: black;
      color: white;
      transition: all 0.2s linear;
    }
  }
`;

export const Header = styled.h4`
  text-align: center;
`;

const LoginForm = () => {
  const { initInfo, login, onChange, postLogin, errorMessage } = AuthStore();
  const navigate = useNavigate();
  const { username, password } = login;

  useEffect(() => {
    initInfo();
  }, [initInfo]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (username === undefined || password === undefined) {
      return;
    }
    const result = await postLogin(username, password);
    if (result) {
      alert("로그인 되었습니다.");
      navigate(process.env.PUBLIC_URL + "/system");
    }
  };

  return (
    <Container>
      <Header>로그인</Header>
      <form onSubmit={onSubmit} id="loginForm">
        <div>
          <label htmlFor="">Username</label>
          <br />
          <input
            type="text"
            minLength={4}
            placeholder="username"
            autoComplete="username"
            name="username"
            value={username || ""}
            onChange={(e) => onChange("login", e.target.name, e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label> <br />
          <input
            minLength={4}
            type="password"
            placeholder="password"
            autoComplete="password"
            name="password"
            value={password || ""}
            onChange={(e) => onChange("login", e.target.name, e.target.value)}
          />
        </div>
        <button type="submit" form="loginForm">
          로그인
        </button>
      </form>
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      <Link to="/auth/signUp">
        <button>회원가입으로</button>
      </Link>
    </Container>
  );
};

export default LoginForm;
