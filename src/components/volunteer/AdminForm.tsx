import React, { useEffect } from "react";
import styled from "styled-components";
import StatusForm from "./status/StatusForm";
import RegisterForm from "./register/RegisterForm";
import { OrganizationStore } from "lib/zustand/organizationStore";

type VolStatusProps = {
  status: string | null;
};

const Container = styled.div`
  height: 100%;
  border-radius: 0px 0px 5px 5px;
  border: rgba(50, 50, 93, 0.25) 1px solid;
  border-top: none;
  padding: 20px;
`;

const AdminForm = ({ status, setNowStatus }: VolStatusProps | any) => {
  const { getOrganizations, organizations } = OrganizationStore();

  useEffect(() => {
    getOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Container>
      {status === "volStatus" && <StatusForm organizations={organizations} />}
      {status === "volRegister" && (
        <RegisterForm
          setNowStatus={setNowStatus}
          organizations={organizations}
        />
      )}
    </Container>
  );
};

export default AdminForm;
