import { AuthStore } from "lib/zustand/auth";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const NavbarDiv = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Navbar = () => {
  const { user, postLogout } = AuthStore();

  return (
    <NavbarDiv>
      <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
          <Nav>
            {!user && (
              <>
                <Nav.Link to="/auth/login" as={NavLink}>
                  Login
                </Nav.Link>
                <Nav.Link to="/auth/signUp" as={NavLink}>
                  SignUp
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link to="/system" as={NavLink}>
                  System
                </Nav.Link>
                <Button variant="dark" onClick={postLogout}>
                  로그아웃
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </NavbarBs>
    </NavbarDiv>
  );
};
