import { TimeProps } from "lib/zustand/registerStore";
import React from "react";
import styled from "styled-components";

type ContentsProps = {
  id: number;
  kor: string;
  eng: string;
};

export type FormProps = {
  contents?: ContentsProps[] | undefined;
  onChange: (name?: any, value?: any, status?: any) => void;
  value?: string;
  id: string;
  timeList?: TimeProps[];
  flag: string;
};

const RadioElement = styled.span`
  margin-right: 10px;
  /* font-weight: 500; */
`;

const Radio = ({ contents, onChange, id, value, flag }: FormProps) => {
  return (
    <div>
      {contents?.map((e) => {
        return (
          <RadioElement key={e.id}>
            <input
              disabled={flag ? false : true}
              checked={value === e.eng}
              type="radio"
              value={e.eng}
              name={id}
              onChange={
                flag !== "mod"
                  ? (e) => onChange(e.target.name, e.target.value, flag)
                  : (e) => onChange(e)
              }
            />
            {e.kor}
          </RadioElement>
        );
      })}
    </div>
  );
};

export default Radio;
