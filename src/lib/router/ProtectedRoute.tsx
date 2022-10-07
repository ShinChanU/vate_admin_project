import React, { useState, useEffect, useCallback } from "react";
import { refresh } from "lib/api/authApi";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "lib/zustand/auth";

const ProtectedRoute = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = AuthStore();

  const alertToLogin = useCallback(
    (msg: string) => {
      alert(msg);
      navigate(process.env.PUBLIC_URL + "/auth/login");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    [navigate]
  );

  useEffect(() => {
    (async () => {
      let res = await refresh();
      if (res) {
        setLoading(true);
        if (res.status === 200) return;
        else alertToLogin("로그인 후 사용가능합니다 !");
      } else {
        alertToLogin("서버의 문제가 발생했습니다 !");
      }
    })();
  }, [alertToLogin, user]);

  return <>{loading && user && children}</>;
};

export default ProtectedRoute;
