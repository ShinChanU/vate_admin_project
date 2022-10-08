import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import { RegisterStore } from "lib/zustand/registerStore";

const FlexBox = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const StyleDatePicker = styled(DatePicker)`
  border-radius: 5px;
  height: 30px;
  width: 200px;
`;

type DateFormProps = {
  name: string;
};

const DateForm = ({ name }: DateFormProps) => {
  const { stringToDate, onChangeDate } = RegisterStore();

  return (
    <FlexBox>
      <div>
        <span>시작일</span>
        <StyleDatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={stringToDate("start", name)}
          onChange={(date: Date) => onChangeDate(name, "start", date)}
          selectsStart
          startDate={stringToDate("start", name)}
          endDate={stringToDate("end", name)}
        />
      </div>
      <div>
        <span>종료일</span>
        <StyleDatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={stringToDate("end", name)}
          onChange={(date: Date) => onChangeDate(name, "end", date)}
          selectsEnd
          startDate={stringToDate("start", name)}
          endDate={stringToDate("end", name)}
          minDate={stringToDate("start", name)}
        />
      </div>
    </FlexBox>
  );
};

export default DateForm;
