import React, { useEffect, useState } from "react";
import { dayKor } from "components/Register/DynamicBox";
import styled from "styled-components";
import { getOrganization } from "lib/api/volunteerApi";
import { OrgProps } from "lib/zustand/organization";

const Container = styled.div`
  margin: 30px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 5px;
  @media screen and (max-width: 767px) {
    /* text-align: center; */
  }
`;

const FlexDiv = styled.div`
  display: flex;

  > div {
    margin-right: 20px;
  }
`;

const Label = styled.label`
  width: 100px;
  font-weight: 650;
`;

const VolDetailValue = ({ title, type, value }: any) => {
  const [orgData, setOrgData] = useState<OrgProps | null>(null);

  useEffect(() => {
    if (type === "org") {
      (async () => {
        let res = await getOrganization(value);
        if (res?.data.statusCode === 200) {
          setOrgData(res.data.result);
        }
      })();
    }
  }, [type, value]);

  return (
    <Container>
      <Title>{title}</Title>
      {type === "text" && <div>{value}</div>}
      {type === "textarea" && (
        <textarea disabled value={value} style={{ width: "100%" }}></textarea>
      )}
      {type === "org" && orgData !== null && (
        <>
          <div>
            <Label>기관 주소 </Label>
            {orgData?.address?.detailAddress}
          </div>
          <div>
            <Label>담당자</Label>
            {orgData?.manager}
          </div>
          <div>
            <Label>기관 번호</Label>
            {orgData?.contact}
          </div>
        </>
      )}
      {type === "array" && (
        <div>
          {value.map((e: any, i: any) => (
            <FlexDiv key={i}>
              <div>{dayKor[e.week]}</div>
              <div>
                {e.startTime}:00 ~ {e.endTime}:00
              </div>
              <div>모집 인원(명) {e.numOfRecruit}</div>
            </FlexDiv>
          ))}
        </div>
      )}
      {type === "date" && (
        <div>
          {value.begin} ~ {value.end}
        </div>
      )}
    </Container>
  );
};

export default VolDetailValue;
