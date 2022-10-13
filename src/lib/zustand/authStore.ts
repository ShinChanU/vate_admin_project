import create from "zustand";
import * as AuthAPI from "../api/authApi";

type UserInfo = {
  username?: string;
  password?: string;
  passwordCheck?: string;
};

interface AuthStoreProps {
  login: UserInfo;
  signUp: UserInfo;
  user: string | null;
  errorMessage: string | null;
  initInfo: () => void;
  onChange: (form: string, name: string, value: string) => void;
  postLogin: (username: string, password: string) => Promise<number>;
  postSignUp: (
    username: string,
    password: string,
    passwordCheck: string
  ) => Promise<number>;
  check: () => void;
  postLogout: () => void;
}

// 로그인, 회원가입 스토어
export const AuthStore = create<AuthStoreProps>((set, get) => ({
  login: {},
  signUp: {},
  user: null, // 로그인 후 담을 유저아이디
  errorMessage: null, // 로그인, 회원가입시 에러메시지

  // 초기값 초기화
  initInfo: () => {
    set({
      login: {
        username: "",
        password: "",
      },
      signUp: {
        username: "",
        password: "",
        passwordCheck: "",
      },
      errorMessage: null,
    });
  },

  // input 입력 함수
  onChange: (form, name, value) => {
    set({ errorMessage: null });
    if (form === "login") {
      set((state) => ({
        login: {
          ...state.login,
          [name]: value,
        },
      }));
    } else {
      set((state) => ({
        signUp: {
          ...state.signUp,
          [name]: value,
        },
      }));
    }
  },

  // login post api
  postLogin: async (username: string, password: string) => {
    if (username === "" || password === "") {
      set({ errorMessage: "모든 항목을 입력해주세요." });
      return 0;
    }
    const res = await AuthAPI.login(username, password);
    if (res?.data.statusCode === 200) {
      // 로그인 성공
      set({ user: username });
      return 1;
    } else {
      // 로그인 실패
      set({ errorMessage: "아이디 또는 비밀번호가 일치하지 않습니다." });
      return 0;
    }
  },

  // userCheck
  check: async () => {
    const res = await AuthAPI.userCheck();
    if (res.data.statusCode === 200) {
      set({ user: res.data.result.memberId });
    }
  },

  // signup post api
  postSignUp: async (
    username: string,
    password: string,
    passwordCheck: string
  ) => {
    if (username === "" || password === "") {
      set({ errorMessage: "모든 항목을 입력해주세요." });
      return 0;
    } else if (password !== passwordCheck) {
      set({ errorMessage: "비밀번호가 일치하지 않습니다." });
      return 0;
    }
    const res = await AuthAPI.signup(username, password);
    if (res?.data.statusCode === 201) {
      // 회원가입 성공
      return 1;
    } else if (res?.data.statusCode === 400) {
      // 회원가입 실패(중복아이디)
      set({ errorMessage: "아이디가 중복되었습니다." });
      return 0;
    } else {
      // 회원가입 실패(그외)
      set({ errorMessage: "회원가입에 실패하였습니다." });
      return 0;
    }
  },

  postLogout: async () => {
    const res = await AuthAPI.logout();
    if (res?.data.statusCode === 200) {
      set({ user: null });
    }
  },
}));
