import { RegisterStore } from "lib/zustand/registerStore";
import React from "react";
import styled from "styled-components";
import registerData from "../lib/json/volRegisterFormData.json";
import DateForm from "./Register/DateForm";
import DynamicBox from "./Register/DynamicBox";
import OrganizationForm from "./Register/OrganizationForm";
import Radio from "./Register/Radio";
import Select from "./Register/Select";

const StyleDiv = styled.div`
  margin: 30px 30px;
  > input,
  > textarea {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 5px;
  @media screen and (max-width: 767px) {
    /* text-align: center; */
  }
`;

const RegisterDetail = () => {
  const { activity, onChange } = RegisterStore();

  console.log(registerData, activity);
  return (
    <div>
      {registerData.map((data) => {
        const { id, title, type } = data;
        return (
          <StyleDiv key={id}>
            <Title>{title}</Title>
            {type === "radio" && (
              <Radio contents={data.contents} onChange={onChange} id={id} />
            )}
            {type === "select" && (
              <Select onChange={onChange} contents={data.contents} id={id} />
            )}
            {type === "dynamicCheckbox" && (
              <DynamicBox
                id={id}
                onChange={onChange}
                contents={data.contents}
              />
            )}
            {type === "organization" && <OrganizationForm />}
            {type === "date" && <DateForm name={id.slice(0, 3)} />}
            {type === "text" && (
              <input
                type="text"
                name={id}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
            )}
            {type === "textarea" && (
              <textarea
                name={id}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
            )}
          </StyleDiv>
        );
      })}
    </div>
  );
};

export default RegisterDetail;
