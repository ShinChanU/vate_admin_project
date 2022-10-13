import React, { useEffect } from "react";
import { AuthStore } from "lib/zustand/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Container, Header } from "./LoginForm";

const SignUpForm = () => {
  const { initInfo, signUp, onChange, postSignUp, errorMessage } = AuthStore();
  const navigate = useNavigate();
  const { username, password, passwordCheck } = signUp;

  useEffect(() => {
    initInfo();
  }, [initInfo]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (
      username === undefined ||
      password === undefined ||
      passwordCheck === undefined
    ) {
      return;
    }
    const result = await postSignUp(username, password, passwordCheck);
    if (result) {
      alert("정상적으로 회원가입이 되었습니다.");
      navigate(process.env.PUBLIC_URL + "/auth/login");
    }
  };

  return (
    <Container>
      <Header>회원가입</Header>
      <form onSubmit={onSubmit} id="signUpForm">
        <div>
          <label htmlFor="">Username</label>
          <br />
          <input
            minLength={4}
            type="text"
            placeholder="username"
            autoComplete="username"
            name="username"
            value={username || ""}
            onChange={(e) => onChange("signUp", e.target.name, e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label> <br />
          <input
            minLength={4}
            type="password"
            placeholder="password"
            autoComplete="new-password"
            name="password"
            value={password || ""}
            onChange={(e) => onChange("signUp", e.target.name, e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password Check</label> <br />
          <input
            minLength={4}
            type="password"
            placeholder="password"
            autoComplete="new-password"
            name="passwordCheck"
            value={passwordCheck || ""}
            onChange={(e) => onChange("signUp", e.target.name, e.target.value)}
          />
        </div>
        <button type="submit" form="signUpForm">
          회원가입
        </button>
      </form>
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      <Link to="/auth/login">
        <button>로그인으로</button>
      </Link>
    </Container>
  );
};

export default SignUpForm;
