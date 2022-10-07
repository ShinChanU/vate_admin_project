import React, { useEffect } from "react";
import { AuthStore } from "lib/zustand/auth";
import { useNavigate } from "react-router-dom";

const SystemPage = () => {
  const { user } = AuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate(process.env.PUBLIC_URL + "/auth/login");
    }
  }, [user, navigate]);

  return <div>시스템 페이지</div>;
};

export default SystemPage;
