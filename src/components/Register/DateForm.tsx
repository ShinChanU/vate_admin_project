import React from "react";
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
  flag: string;
};

const DateForm = ({ name, flag }: DateFormProps) => {
  const { stringToDate, onChangeDate } = RegisterStore();

  return (
    <FlexBox>
      <div>
        <span>시작일</span>
        <StyleDatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={stringToDate("start", name, flag)}
          onChange={(date: Date) => onChangeDate(name, "start", date)}
          selectsStart
          startDate={stringToDate("start", name, flag)}
          endDate={stringToDate("end", name, flag)}
        />
      </div>
      <div>
        <span>종료일</span>
        <StyleDatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={stringToDate("end", name, flag)}
          onChange={(date: Date) => onChangeDate(name, "end", date)}
          selectsEnd
          startDate={stringToDate("start", name, flag)}
          endDate={stringToDate("end", name, flag)}
          minDate={stringToDate("start", name, flag)}
        />
      </div>
    </FlexBox>
  );
};

export default DateForm;
