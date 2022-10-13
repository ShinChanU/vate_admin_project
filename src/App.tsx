import React from "react";
import AuthPage from "pages/AuthPage";
import SystemPage from "pages/SystemPage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "components/common/NavBar";
import styled from "styled-components";
import ProtectedRoute from "lib/router/ProtectedRoute";
import { Container } from "react-bootstrap";

const Layout = styled.div`
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleContainer = styled(Container)`
  height: 100vh;
  margin-bottom: 30px;
`;

function App() {
  return (
    <Layout>
      <Navbar />
      <StyleContainer>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SystemPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/system/*"
            element={
              <ProtectedRoute>
                <SystemPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/auth/*" element={<AuthPage />}></Route>
        </Routes>
        <div>&nbsp;</div>
      </StyleContainer>
    </Layout>
  );
}

export default App;
