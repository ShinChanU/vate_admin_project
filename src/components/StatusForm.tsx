import { ActivityStore } from "lib/zustand/activityStore";
import { OrgProps } from "lib/zustand/organization";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VolItem from "components/Volunteer/VolItem";
import VolDetail from "./Volunteer/VolDetail";

const VolList = styled.div`
  margin-top: 10px;
  border: 1px solid rgba(50, 50, 93, 0.25);
  border-radius: 5px;
  padding: 10px;

  header {
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(91, 91, 192);
  }
`;

const VolItems = styled.div`
  height: 500px;
  overflow: auto;
`;

const StatusForm = ({ organizations }: any) => {
  const [detailPageData, setDetailPageData] = useState(null);
  const { activities, getActivities } = ActivityStore();

  useEffect(() => {
    // initActivities();
  }, []);

  const onChangeOrgId = (orgId: number) => {
    getActivities(orgId);
  };

  return (
    <>
      {!detailPageData && (
        <div>
          <select onChange={(e) => onChangeOrgId(+e.target.value)}>
            <option value="">선택해주세요.</option>
            {organizations?.map((e: OrgProps) => (
              <option
                key={e.id}
                value={e.id}
                selected={(activities?.[0]?.organization || "") === e.name}
              >
                {e.name}
              </option>
            ))}
          </select>
          <VolList>
            <header>봉사 내용</header>
            {!!activities?.length && (
              <VolItems>
                {activities.map((item) => (
                  <VolItem
                    key={item.id}
                    item={item}
                    setDetailPageData={setDetailPageData}
                  />
                ))}
              </VolItems>
            )}
            {!activities?.length && <div>등록된 봉사가 없는 기관입니다</div>}
          </VolList>
        </div>
      )}
      {!!detailPageData && <VolDetail volData={detailPageData} />}
    </>
  );
};

export default StatusForm;
