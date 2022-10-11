import React from "react";
import { FormProps } from "./Radio";

const Select = ({ contents, onChange, id }: FormProps) => {
  return (
    <select name={id} onChange={(e) => onChange(e.target.name, e.target.value)}>
      <option value="">선택해주세요.</option>
      {contents?.map((e) => (
        <option key={e.eng} value={e.eng}>
          {e.kor}
        </option>
      ))}
    </select>
  );
};

export default Select;
