import React from "react";
import styled from "styled-components";

type ContentsProps = {
  id: number;
  kor: string;
  eng: string;
};

export type FormProps = {
  contents: ContentsProps[] | undefined;
  onChange: (name: string, value: any) => void;
  id: string;
};

const RadioElement = styled.span`
  margin-right: 10px;
  /* font-weight: 500; */
`;

const Radio = ({ contents, onChange, id }: FormProps) => {
  return (
    <div>
      {contents?.map((e) => {
        return (
          <RadioElement key={e.id}>
            <input
              type="radio"
              value={e.eng}
              name={id}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            {e.kor}
          </RadioElement>
        );
      })}
    </div>
  );
};

export default Radio;
