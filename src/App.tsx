import React from "react";
import AuthPage from "pages/AuthPage";
import Home from "pages/Home";
import SystemPage from "pages/SystemPage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "components/NavBar";
import styled from "styled-components";

const Layout = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  height: 100vh;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleContainer = styled.div`
  /* flex: 1;
  display: flex;
  align-items: stretch; */
`;

function App() {
  return (
    <Layout>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<SystemPage />}></Route>
          <Route path="/system/*" element={<SystemPage />}></Route>
          <Route path="/auth/*" element={<AuthPage />}></Route>
        </Routes>
      </Container>
    </Layout>
  );
}

export default App;
