import React from "react";
import AuthPage from "pages/AuthPage";
import Home from "pages/Home";
import SystemPage from "pages/SystemPage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "components/NavBar";
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
      </StyleContainer>
    </Layout>
  );
}

export default App;
