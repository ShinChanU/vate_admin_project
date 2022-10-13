import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VolItem from "components/volunteer/status/VolItem";
import VolDetail from "./VolDetail";
import ModifyVolForm from "./ModifyVolForm";
import { deleteActivity, updateActivity } from "lib/api/volunteerApi";
import { OrgProps } from "lib/zustand/organizationStore";
import { RegisterStore } from "lib/zustand/volunteerStore";

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
  const [activityData, setActivityData] = useState(null);
  const [isActModify, setIsActModify] = useState(false);
  const { activities, getActivities } = RegisterStore();
  const [modActData, setModActData] = useState({});
  const [ids, setIds] = useState({
    orgId: -1,
    actId: -1,
  });

  useEffect(() => {
    if (activityData) {
      const {
        activityName,
        activitySummary,
        activityContent,
        activityMethod,
        authorizationType,
        category,
        id,
      } = activityData;
      setModActData({
        activityName,
        activitySummary,
        activityContent,
        activityMethod,
        authorizationType,
        category,
      });
      setIds({
        ...ids,
        actId: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityData]);

  const checkObjIsEmpty = (obj: any) => {
    for (let key in obj) if (!obj[key].trim()) return false;
    return true;
  };

  const onChangeOrgId = (orgId: number) => {
    setIds({
      ...ids,
      orgId: orgId,
    });
    getActivities(orgId);
  };

  const onClickDeleteActivity = async (actId: any, orgId: any) => {
    if (window.confirm("해당 봉사를 정말 삭제하시겠습니까?")) {
      let res = await deleteActivity(actId);
      if (res?.data.statusCode === 200) {
        alert("삭제되었습니다.");
        setActivityData(null);
        getActivities(orgId);
      }
    }
  };

  const onClickUpdateActivity = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      if (checkObjIsEmpty(modActData)) {
        let res = await updateActivity(ids.actId, modActData);
        if (res?.data.statusCode === 200) {
          alert("수정되었습니다.");
          setIsActModify(false);
          setActivityData(null);
          getActivities(ids.orgId);
        }
      } else {
        alert("공백이 있습니다. 수정되지 않았습니다.");
      }
    }
  };

  const onChangeModAct = (e: any) => {
    const { name, value } = e.target;
    setModActData({
      ...modActData,
      [name]: value,
    });
  };

  return (
    <>
      {/* 봉사 기관 선택 및 기관별 활동 조회 폼 */}
      {!activityData && !isActModify && (
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
            <header style={{ fontWeight: "550" }}>봉사 내용</header>
            {!!activities?.length && (
              <VolItems>
                {activities.map((item) => (
                  <VolItem
                    key={item.id}
                    data={item}
                    setActivityData={setActivityData}
                    onClickDeleteActivity={onClickDeleteActivity}
                    setIsActModify={setIsActModify}
                  />
                ))}
              </VolItems>
            )}
            {!activities?.length && (
              <div style={{ textAlign: "center" }}>
                등록된 봉사가 없는 기관입니다
              </div>
            )}
          </VolList>
        </div>
      )}
      {/* 봉사 활동 상세 조회 및 승인 관리 폼 */}
      {!!activityData && !isActModify && (
        <VolDetail
          data={activityData}
          setActivityData={setActivityData}
          onClickDeleteActivity={onClickDeleteActivity}
          setIsActModify={setIsActModify}
        />
      )}
      {/* 봉사 활동 수정 폼 */}
      {!!activityData && isActModify && (
        <ModifyVolForm
          setIsActModify={setIsActModify}
          setActivityData={setActivityData}
          modActData={modActData}
          activityData={activityData}
          onChangeModAct={onChangeModAct}
          onClickUpdateActivity={onClickUpdateActivity}
        />
      )}
    </>
  );
};

export default StatusForm;
