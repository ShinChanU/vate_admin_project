import React from "react";
import { FormProps } from "./Radio";

const Select = ({ contents, onChange, id, value, flag }: FormProps) => {
  return (
    <select
      disabled={flag ? false : true}
      value={value || ""}
      name={id}
      onChange={
        flag !== "mod"
          ? (e) => onChange(e.target.name, e.target.value, flag)
          : (e) => onChange(e)
      }
    >
      {flag !== "mod" && <option value="">선택해주세요.</option>}
      {contents?.map((e) => (
        <option key={e.eng} value={e.eng}>
          {e.kor}
        </option>
      ))}
    </select>
  );
};

export default Select;
