import React, { useEffect } from "react";
import { RegisterStore } from "lib/zustand/volunteerStore";
import styled from "styled-components";
import registerData from "../../../lib/json/volRegisterFormData.json";
import DateForm from "./DateForm";
import DynamicBox from "./DynamicBox";
import Radio from "./Radio";
import OrganizationForm from "./OrganizationForm";
import Select from "./Select";

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

const InputForm = ({
  setPage,
  organizations,
  activity,
  timeList,
  flag,
}: any) => {
  const { initRegisterForm, onChange } = RegisterStore();

  useEffect(() => {
    if (!activity) {
      initRegisterForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  return (
    <div>
      {registerData.map((data) => {
        const { id, title, type } = data;
        return (
          <StyleDiv key={id}>
            <Title>{title}</Title>
            {type === "radio" && (
              <Radio
                value={activity?.[id]}
                contents={data.contents}
                onChange={onChange}
                flag={flag}
                id={id}
              />
            )}
            {type === "select" && (
              <Select
                value={activity?.[id]}
                onChange={onChange}
                flag={flag}
                contents={data.contents}
                id={id}
              />
            )}
            {type === "dynamicCheckbox" && (
              <DynamicBox
                onChange={onChange}
                id={id}
                contents={data.contents}
                timeList={timeList}
                flag={flag}
              />
            )}
            {type === "organization" && (
              <OrganizationForm
                organizations={organizations}
                setPage={setPage}
              />
            )}
            {type === "date" && <DateForm name={id.slice(0, 3)} flag={flag} />}
            {type === "text" && (
              <input
                type="text"
                name={id}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={activity?.[id] || ""}
              />
            )}
            {type === "textarea" && (
              <textarea
                name={id}
                value={activity?.[id] || ""}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
            )}
          </StyleDiv>
        );
      })}
    </div>
  );
};

export default InputForm;
