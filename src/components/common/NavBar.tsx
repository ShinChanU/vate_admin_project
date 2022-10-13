import { AuthStore } from "lib/zustand/authStore";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "lib/image/vateLogo.png";

const NavbarDiv = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const Img = styled.img`
  height: 40px;
  margin-right: 5px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const Navbar = () => {
  const { user, postLogout } = AuthStore();

  return (
    <NavbarDiv>
      <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
          <Nav style={{ marginRight: "50px" }}>
            <Img src={logo} alt="icon" />
            <div
              style={{ margin: "auto", fontSize: "20px", fontWeight: "550" }}
            >
              Vate
            </div>
          </Nav>
          <Nav style={{ width: "100%" }}>
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
              <Flex>
                <Button variant="dark" onClick={postLogout}>
                  로그아웃
                </Button>
              </Flex>
            )}
          </Nav>
        </Container>
      </NavbarBs>
    </NavbarDiv>
  );
};
